'use client';
import { useRef, useEffect } from 'react';

export default function PosInput() {
  const barcodeRef = useRef(null);

  useEffect(() => {
    barcodeRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = barcodeRef.current.value;
    console.log("Scanned:", code);
    barcodeRef.current.value = "";
    barcodeRef.current.focus();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input
        ref={barcodeRef}
        className="w-full border p-3 text-xl rounded"
        placeholder="สแกนบาร์โค้ดแล้ว Enter"
      />
    </form>
  );
}