import ReceiptClient from './receipt';

export default async function ReceiptPage({ params }) {
    const { id } = await params
    return (
      <div>
        <ReceiptClient id={id} ></ReceiptClient>
      </div>
    );
  }