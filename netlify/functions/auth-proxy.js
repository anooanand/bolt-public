// Netlify Function to proxy Supabase authentication requests
// This bypasses browser-to-Supabase connectivity issues

const fetch = require('node-fetch');

// Supabase project details - these will be used server-side
const SUPABASE_URL = 'https://rvlotczavccreigdzczo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2bG90Y3phdmNjcmVpZ2R6Y3pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5NTkyNDMsImV4cCI6MjA2NDUzNTI0M30.6gIQ0XmqgwmoULkgvZg4m3GTvsFKPv0MmesXiscRjbg';

exports.handler = async (event, context) => {
  // Enable CORS for all origins
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
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
        endpoint = '/auth/v1/signup';
        requestBody = { email, password, options };
        break;
      case 'signin':
        endpoint = '/auth/v1/token?grant_type=password';
        requestBody = { email, password };
        break;
      case 'signout':
        endpoint = '/auth/v1/logout';
        break;
      case 'reset':
        endpoint = '/auth/v1/recover';
        requestBody = { email, options };
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
