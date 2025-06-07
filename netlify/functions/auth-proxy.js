// Netlify Function to proxy Supabase authentication requests
// This bypasses browser-to-Supabase connectivity issues

const fetch = require('node-fetch');

// Supabase project details - these will be used server-side
const SUPABASE_URL = 'https://rvlotczavccreigdzczo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2bG90Y3phdmNjcmVpZ2R6Y3pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5NTkyNDMsImV4cCI6MjA2NDUzNTI0M30.6gIQ0XmqgwmoULkgvZg4m3GTvsFKPv0MmesXiscRjbg';

exports.handler = async (event, context ) => {
  // Enable CORS for all origins
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS' ) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'CORS preflight successful' })
    };
  }

  try {
    // Parse the request body
    let body = {};
    try {
      body = JSON.parse(event.body || '{}');
    } catch (e) {
      console.log('Error parsing request body:', e);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid request body' })
      };
    }
    
    const { action, email, password, options } = body;
    
    console.log(`Processing ${action} request`);
    
    // Handle ping action for connection testing
    if (action === 'ping') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          status: 'ok', 
          message: 'Auth proxy is working',
          timestamp: new Date().toISOString()
        })
      };
    }
    
    // Determine which Supabase endpoint to call based on the action
    let endpoint = '';
    let requestBody = {};
    let method = 'POST';
    
    switch (action) {
      case 'signup':
        // FIXED: Use the v1/signup endpoint with proper data structure
        endpoint = '/auth/v1/signup';
        requestBody = { 
          email, 
          password,
          data: options?.data || {},  // Include user metadata if provided
          gotrue_meta_security: {}    // Required by newer Supabase versions
        };
        break;
      case 'signin':
        // FIXED: Use the password grant type with proper structure
        endpoint = '/auth/v1/token?grant_type=password';
        requestBody = { 
          email, 
          password,
          gotrue_meta_security: {}    // Required by newer Supabase versions
        };
        break;
      case 'signout':
        endpoint = '/auth/v1/logout';
        break;
      case 'reset-password':
        endpoint = '/auth/v1/recover';
        requestBody = { email };
        break;
      default:
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Invalid action specified' })
        };
    }
    
    console.log(`Forwarding request to Supabase: ${SUPABASE_URL}${endpoint}`);
    
    // Forward the request to Supabase
    const response = await fetch(`${SUPABASE_URL}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY
      },
      body: JSON.stringify(requestBody)
    });
    
    // Get the response data
    const data = await response.json();
    
    console.log(`Supabase response status: ${response.status}`);
    
    // FIXED: For sign-in and sign-up, ensure we return a complete session object with all required fields
    if ((action === 'signin' || action === 'signup') && data.access_token) {
      // Calculate expires_at if not provided
      const expiresIn = data.expires_in || 3600;
      const expiresAt = data.expires_at || Math.floor(Date.now() / 1000) + expiresIn;
      
      // Ensure we have all required session properties
      const completeSession = {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        expires_in: expiresIn,
        expires_at: expiresAt,
        token_type: data.token_type || 'bearer',
        user: data.user || null,
        
        // FIXED: Add additional properties needed by Supabase client
        provider_token: data.provider_token || null,
        provider_refresh_token: data.provider_refresh_token || null
      };
      
      // Return the complete session
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify(completeSession)
      };
    }
    
    // Return the response from Supabase
    return {
      statusCode: response.status,
      headers,
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error('Auth proxy error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message,
        stack: error.stack
      })
    };
  }
};

