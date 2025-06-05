import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 flex-col space-y-4">
      <h1 className="text-3xl font-bold">Welcome to Next POS</h1>
      <Link
        href="/login"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Go to Login
      </Link>
    </main>
  );
}