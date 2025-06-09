import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

export default function PosLayout({ children }) {
  return (
    <div className='flex min-h-screen'>
      {/* Sidebar */}
      <aside className='w-64 bg-gray-800 text-white p-4'>
      <AppSidebar />
        {/* ใส่ลิงก์เมนู */}
      </aside>

      <main className='flex-1'>
        {/* Header */}
        <Header />

        {/* Content */}
        <div className='p-4'>{children}</div>
      </main>
    </div>
  );
}
