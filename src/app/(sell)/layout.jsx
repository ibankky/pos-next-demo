import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import MemberSidebar from "@/components/Member";


export default function SellLayout({ children }) {
  return (
    <div className='flex min-h-screen'>
      <main className='flex-1 flex flex-col'>
        {/* Header */}
        <Header />

        {/* Content */}
        <div className='flex flex-1'>
          <div className="flex-1 p-4 overflow-auto bg-gray-100">{children}</div>
          <MemberSidebar />
        </div>
      </main>
    </div>
  );
}
