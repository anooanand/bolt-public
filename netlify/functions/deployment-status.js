const { getDeploymentStatus } = require('@netlify/functions');

exports.handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    // Get deployment ID from query parameters or use default
    const deployId = event.queryStringParameters?.id;
    
    if (!deployId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Deployment ID is required' })
      };
    }

    // Get deployment status from Netlify
    const status = await getDeploymentStatus({ id: deployId });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(status)
    };
  } catch (error) {
    console.error('Error getting deployment status:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: error.message || 'An error occurred while checking deployment status',
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      })
    };
  }
};