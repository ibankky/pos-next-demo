'use client'

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="flex flex-col items-center space-y-4">
      <div className="w-16 h-16 rounded-full border-4 border-blue-400 border-t-transparent animate-spin-custom" />
      </div>
    </div>
  );
}