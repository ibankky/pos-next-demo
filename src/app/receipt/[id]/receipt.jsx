"use client";
import { useEffect, useState } from "react";

export default function ReceiptClient({ id }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchReceipt = async () => {
      const mockData = {
        receiptNo: id,
        date: "1/5/2568 15:24:43",
        branch: "CR9",
        pos: "CR9-002",
        cashier: "ธนวรรณ",
        card: "24F2C620",
        items: [
          {
            name: "วันแรงงาน - เติมเงิน",
            desc: "300 รับฟรี 110 บาท",
            qty: 1,
            price: 300,
          },
        ],
        subtotal: 280.37,
        vat: 19.63,
        total: 300.0,
        pay: 500.0,
        paymentMethod: "Shopee Pay",
        ecoin: 300,
        ebonus: 110,
        token: 0,
        customer: {
          name: "Natnaree Boonumch∞",
          tel: "0970210555",
        },
      };
      setData(mockData);
    };

    fetchReceipt();
  }, [id]);

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        window.print();
      }, 300);
      window.onafterprint = () => window.close();
    }
  }, [data]);

  if (!data) return <div className='p-4 text-center text-sm'>กำลังโหลด...</div>;

  return (
    <div className='font-mono text-xs w-[80mm] mx-auto p-4 print:w-auto'>
      <h1 className='text-center font-bold text-base'>Joyliday</h1>
      <p className='text-center'>ใบเสร็จรับเงิน/ใบกำกับภาษีอย่างย่อ</p>
      <p className='text-center'>*** สาขา ***</p>
      <p className='text-center leading-tight'>
        บริษัท แฟมมิลี่ออฟมินท์ จำกัด
        <br />
        521,519 ถนนพระยาสุเรนทร์ แขวงบางชัน
        <br />
        เขตคลองสามวา กรุงเทพ 10510
        <br />
        เลขประจำตัวผู้เสียภาษี : 0105545042708
      </p>

      <div className='mt-2 text-[11px]'>
        <div className='flex justify-between'>
          <span>No: {data.receiptNo}</span>
          <span>Date: {data.date}</span>
        </div>
        <div>
          สาขา: {data.branch} POS : {data.pos}
        </div>
        <div>Cashier : {data.cashier}</div>
        <div>Card : {data.card}</div>
      </div>

      <hr className='my-2 border-dashed border-t' />

      <table className='w-full'>
        <thead>
          <tr className='border-b border-dashed'>
            <th className='text-left'>Qty</th>
            <th className='text-left'>รายการ</th>
            <th className='text-right'>ราคา</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item, i) => (
            <tr key={i}>
              <td className='align-top'>{item.qty}</td>
              <td className='px-1'>
                {item.name}
                <div className='text-[10px] text-gray-600'>{item.desc}</div>
              </td>
              <td className='text-right align-top'>{item.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr className='my-2 border-dashed border-t' />
      <div className='flex'>
        <div className="w-1/2"></div>
        <div className="w-1/2">
          <div className='flex justify-between text-[11px]'>
            <span>Sub-Total</span>
            <span>{data.subtotal.toFixed(2)}</span>
          </div>
          <div className='flex justify-between text-[11px]'>
            <span>Vat 7%</span>
            <span>{data.vat.toFixed(2)}</span>
          </div>

          <div className='flex justify-between font-bold text-[13px] mt-2'>
            <span>Total</span>
            <span>{data.total.toFixed(2)}</span>
          </div>
          <div className='flex justify-between font-bold text-[11px] mt-2'>
            <span>รับเงิน</span>
            <span>{data.pay.toFixed(2)}</span>
          </div>
          <div className='flex justify-between font-bold text-[11px]'>
            <span>เงินทอน</span>
            <span>
              {(data.total.toFixed(2) - data.pay.toFixed(2)).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <p className='mt-1 text-[11px] text-center mt-4'>Paid by : {data.paymentMethod}</p>

      <hr className='my-2 border-dashed border-t' />

      <div className='text-[11px] leading-tight'>
        <p>ecoin ที่ได้รับ : {data.ecoin} e-coin</p>
        <p>eBonus ที่ได้รับ : {data.ebonus} e-coin</p>
        <p>Token ที่ได้รับ : {data.token} เหรียญ</p>
      </div>

      <hr className='my-2 border-dashed border-t' />

      <div className='text-[11px] leading-tight'>
        <p>Customer</p>
        <p>Tel : {data.customer.tel}</p>
        <p>Name : {data.customer.name}</p>
      </div>

      <p className='text-center mt-2 text-[11px]'>ขอบคุณที่ใช้บริการ</p>
      <p className='text-center text-[10px]'>
        {new Date().toLocaleString("th-TH")}
      </p>
    </div>
  );
}
