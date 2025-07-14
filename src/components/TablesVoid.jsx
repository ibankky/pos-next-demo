'use client';

import { Trash } from "lucide-react";
import { usePosStore } from "@/store";

export default function Tables({ rows = [] , }) {
  const removeItemByMenuId = usePosStore((state) => state.removeItemByMenuId);
  const updateItemQty = usePosStore((state) => state.updateItemQty);

  
  if (!rows.length) return <div className="text-center py-4 text-gray-500">No data</div>;

  const headers = Object.keys(rows[0]).filter((key) => key !== "menu_id");
  
  const columnNames = {
    name: 'รายการ',
    qty : 'จำนวน',
    price: 'ราคา',
    ecoin: 'eCoin',
    ebonus: 'eBonus',
  };

  

  

  return (
    <div className="overflow-auto border rounded-lg shadow">
      <table className="min-w-full table-auto text-md text-left text-gray-700">
        <thead className="bg-gray-200 text-gray-800 text-md font-semibold">
          <tr>
            {headers.map((key) => (
              <th key={key} className={`px-4 py-2 ${typeof rows[0][key] === 'number' ? 'text-right' : ''}`}>
                 {columnNames[key] || key}
              </th>
            ))}
            <th className="px-4 py-2 text-center"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {rows.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {headers.map((key) => (
               <td
               key={key}
               className={`px-4 py-2 ${
                 typeof row[key] === "number" ? "text-right" : ""
               }`}
             >
               {row[key]}
             </td>
              ))}
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}