const https = require('https'  );

exports.handler = async (event) => {
  // Handle OPTIONS requests for CORS preflight
  if (event.httpMethod === 'OPTIONS'  ) {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization, apikey, X-Client-Info',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Max-Age': '86400',
      },
      body: '',
    };
  }

  // Extract the path from the URL
  const path = event.path.replace('/.netlify/functions/supabase-auth', '');
  
  // Set up the request options
  // FIXED: Updated to match the client-side configuration
  const options = {
    hostname: 'rvlotczavccreigdzczo.supabase.co',
    path: `/auth/v1${path}`,
    method: event.httpMethod,
    headers: {
      ...event.headers,
      host: 'rvlotczavccreigdzczo.supabase.co',
    },
  };

  // Remove headers that might cause issues
  delete options.headers['host'];
  delete options.headers['connection'];
  delete options.headers['content-length'];

  try {
    // Make the request to Supabase
    const response = await new Promise((resolve, reject  ) => {
      const req = https.request(options, (res  ) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body,
          });
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      // Send the request body if it exists
      if (event.body) {
        req.write(event.body);
      }
      
      req.end();
    });

    // Return the response with CORS headers
    return {
      statusCode: response.statusCode,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization, apikey, X-Client-Info',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        ...response.headers,
      },
      body: response.body,
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization, apikey, X-Client-Info',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      },
      body: JSON.stringify({ error: error.message }),
    };
  }
};
