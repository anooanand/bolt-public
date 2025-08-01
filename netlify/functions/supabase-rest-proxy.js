// Netlify Function to proxy Supabase REST API requests
// This bypasses browser-to-Supabase connectivity issues

const fetch = require('node-fetch');

// Supabase project details - these will be used server-side
const SUPABASE_URL = 'https://rvlotczavccreigdzczo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2bG90Y3phdmNjcmVpZ2R6Y3pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5NTkyNDMsImV4cCI6MjA2NDUzNTI0M30.6gIQ0XmqgwmoULkgvZg4m3GTvsFKPv0MmesXiscRjbg';

exports.handler = async (event, context) => {
  // Enable CORS for all origins
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, apikey, X-Client-Info, Prefer',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS'
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
    // Extract the path from the URL (remove the function prefix)
    const path = event.path.replace('/.netlify/functions/supabase-rest-proxy', '');
    
    // Construct the full Supabase URL
    const supabaseUrl = `${SUPABASE_URL}${path}`;
    
    console.log(`Proxying request to: ${supabaseUrl}`);
    
    // Prepare headers for Supabase request
    const supabaseHeaders = {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'X-Client-Info': 'supabase-js/2.39.3'
    };
    
    // Add any additional headers from the original request
    if (event.headers.authorization && event.headers.authorization !== `Bearer ${SUPABASE_ANON_KEY}`) {
      supabaseHeaders.Authorization = event.headers.authorization;
    }
    
    if (event.headers.prefer) {
      supabaseHeaders.Prefer = event.headers.prefer;
    }
    
    // Make the request to Supabase
    const response = await fetch(supabaseUrl, {
      method: event.httpMethod,
      headers: supabaseHeaders,
      body: event.body || undefined
    });
    
    // Get the response data
    const data = await response.text();
    
    console.log(`Supabase response status: ${response.status}`);
    
    // Return the response from Supabase
    return {
      statusCode: response.status,
      headers: {
        ...headers,
        'Content-Type': response.headers.get('content-type') || 'application/json'
      },
      body: data
    };
    
  } catch (error) {
    console.error('Supabase REST proxy error:', error);
    
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