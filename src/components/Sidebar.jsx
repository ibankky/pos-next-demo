"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from 'lucide-react';
import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
export default function SidebarMenuWrapper() {
  const sidebarMenu = [
    { id: 1, label: "Home", value: "/topup" },
    { id: 2, label: "Orders", value: "/orders" },
    { id: 3, label: "Receipt", value: "/receipt/AA-123" },
    { id: 4, label: "Pos menu", value: "/pos-menu" },
  ];

  return (
    <>
      <div>Side bar Menu</div>
      <div className='flex flex-col gap-4 mt-10'>
        <SidebarProvider>
          <Sidebar className="flex flex-col justify-between h-full">
            <SidebarContent className="flex-1">
              {/* ✅ User Info Section */}
            <div className="flex items-start gap-4 p-4 border-b border-gray-200">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <span className="text-black text-xl">👤</span>
                {/* หรือใช้ lucide-react icon เช่น <User className="w-5 h-5" /> */}
              </div>
              <div className="text-sm text-black leading-tight">
                <div className="mb-1">สาขา : XXXX</div>
                <div className="mb-1">ผู้เข้าใช้ : XXXXXXXX</div>
                <div className="mb-1">Family Amusement Co.,ltd</div>
              </div>
            </div>
              <SidebarGroup>
                {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
                <SidebarGroupContent>
                  <SidebarMenu className='gap-2'>
                    {sidebarMenu.map((item) => (
                      <SidebarMenuItem key={item.id} className="bg-white rounded-sm px-2 py-2 hover:bg-gray-100">
                        <SidebarMenuButton asChild>
                          <a href={item.value}>
                            {/* ถ้ามี icon: <item.icon /> */}
                            <span>{item.label}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <div className="p-4 border-t border-gray-200">
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => {
                // ทำ logout action ที่นี่
                console.log("Logging out...");
              }}
            >
              <div className="flex">
              <LogOut className="mr-2"/>
                ออกจากระบบ
              </div>
             
            </Button>
            </div>
          </Sidebar>
        </SidebarProvider>
        {/*  {sidebarMenu.map((menu) => (
          <Button
            key={menu.id}
            className="h-16 text-lg"
            onClick={() => handleClick(menu)}
          >
            {menu.label}
          </Button>
        ))} */}
      </div>
    </>
  );
}
