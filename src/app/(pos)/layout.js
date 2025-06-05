export default function PosLayout({ children }) {
  return (
    <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="w-64 bg-gray-800 text-white p-4">
            <h2 className="text-xl font-bold mb-4">My Menu</h2>
            {/* ใส่ลิงก์เมนู */}
          </aside>

          <main className="flex-1">
            {/* Header */}
            <header className="bg-white shadow p-4">
              <h1 className="text-xl font-bold">Header</h1>
            </header>

            {/* Content */}
            <div className="p-4">{children}</div>
          </main>
        </div>
  );
}
