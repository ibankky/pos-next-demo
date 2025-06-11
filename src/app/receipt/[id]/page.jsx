import ReceiptClient from './receipt';

export default async function ReceiptPage({ params }) {
  // ✅ แก้ให้ใช้กับ dynamic route อย่างถูกต้อง
  const id = params?.id;

  return <ReceiptClient id={id} />;
}
