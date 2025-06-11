'use client'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
export default function Sidebar() {
  const router = useRouter()
    const sidebarMenu = [
        { id: 1, label: "Home", value: "/topup" },
        { id: 2, label: "Orders", value: "/orders" },
        { id: 3, label: "Settings", value: "/settings" },
        { id: 4, label: "Receipt" , value : '/receipt/AA-123'}
      ];

      const handleClick = (menu) => {
        console.log(`Clicked: ${menu.value}`)
        router.push(menu.value)
      }
  return (
    <>
        <div>Side bar Menu</div>
        <div className="flex flex-col gap-4 mt-10">
        {sidebarMenu.map((menu) => (
          <Button
            key={menu.id}
            className="h-16 text-lg"
            onClick={() => handleClick(menu)}
          >
            {menu.label}
          </Button>
        ))}
        </div>
    </>
  )
}