// components/I18nProvider.jsx
'use client'; // This directive is crucial! It marks this component as a Client Component.

import React, { useEffect } from 'react';
import '../i18n/i18n'; 
export default function I18nProvider({ children }) {


  return (
    <>
      {children}
    </>
  );
}