"use client";

import { useEffect } from "react";

export default function PatientIndex() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.replace('/Patient/Dashboard');
    }
  }, []);

  return null;
}


