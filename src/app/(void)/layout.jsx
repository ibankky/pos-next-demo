import Header from "@/components/HeaderVoidPage";


export default function VoidLayout({ children }) {
  return (
    <div className='flex min-h-screen'>
      <main className='flex-1 flex flex-col'>
        {/* Header */}
        <Header />

        {/* Content */}
        <div className='flex flex-1'>
          <div className="flex-1 p-4 overflow-auto bg-gray-100">{children}</div>
        </div>
      </main>
    </div>
  );
}
