import React from 'react';

const DebugEnv = () => {
  return (
    <div style={{ padding: '1rem', background: '#fff3cd', border: '1px solid #ffeeba', color: '#856404', margin: '2rem' }}>
      <h2>⚙️ Debug: Environment Variables</h2>
      <p><strong>VITE_SUPABASE_URL:</strong> {import.meta.env.VITE_SUPABASE_URL || 'undefined'}</p>
      <p><strong>VITE_SUPABASE_ANON_KEY:</strong> {import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Loaded ✅' : 'undefined ❌'}</p>
    </div>
  );
};

export default DebugEnv;
