// src/components/Footer.tsx
import React from 'react';

export function Footer() {
  return (
    <footer className="text-center py-4 text-sm text-gray-500">
      © {new Date().getFullYear()} InstaChat AI. All rights reserved.
    </footer>
  );
}
