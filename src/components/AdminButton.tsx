import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import { AdminTools } from './AdminTools';

export function AdminButton() {
  const [showAdminTools, setShowAdminTools] = useState(false);
  
  return (
    <>
      <button
        onClick={() => setShowAdminTools(true)}
        className="fixed bottom-4 right-4 p-3 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-colors z-50"
        title="Admin Tools"
      >
        <Shield className="h-5 w-5" />
      </button>
      
      {showAdminTools && (
        <AdminTools onClose={() => setShowAdminTools(false)} />
      )}
    </>
  );
}