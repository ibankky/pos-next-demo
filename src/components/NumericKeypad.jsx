'use client';

import { useState } from 'react';

export default function NumericKeypad({ onConfirm }) {
  const [value, setValue] = useState('');

  const handlePress = (key) => {
    if (key === 'C') return setValue('');
    if (key === '←') return setValue((prev) => prev.slice(0, -1));
    setValue((prev) => prev + key);
  };

  return (
    <div className="space-y-4">
      <div className="text-2xl text-center bg-white p-2 border rounded">{value || '0'}</div>
      <div className="grid grid-cols-3 gap-2">
        {['1','2','3','4','5','6','7','8','9','0','←','C'].map(k => (
          <button key={k} onClick={() => handlePress(k)} className="bg-blue-500 text-white py-2 rounded">
            {k}
          </button>
        ))}
      </div>
      <button
        onClick={() => onConfirm(value)}
        className="w-full bg-green-600 text-white py-3 rounded"
      >
        Confirm
      </button>
    </div>
  );
}
