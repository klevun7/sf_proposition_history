// components/I18nProvider.jsx
'use client'; 

import React, { useEffect } from 'react';
import '../i18n/i18n'; 
export default function I18nProvider({ children }) {


  return (
    <>
      {children}
    </>
  );
}