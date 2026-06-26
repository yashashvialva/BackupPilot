"use client";

import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
  return (
    <Toaster 
      position="bottom-right" 
      toastOptions={{ 
        style: { 
          background: '#0f172a', 
          color: '#f1f5f9', 
          border: '1px solid #1e293b', 
          fontSize: '13px' 
        } 
      }} 
    />
  );
}
