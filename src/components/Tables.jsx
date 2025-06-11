'use client';

export default function Tables({ rows = [] }) {
  if (!rows.length) return <div className="text-center py-4 text-gray-500">No data</div>;

  const headers = Object.keys(rows[0]);

  const columnNames = {
    date: 'วันที่',
    number: 'เลขที่',
    card: 'Card No.',
    member: 'สมาชิก',
    price: 'ราคา',
    credit: 'เครดิต',
    bonus: 'โบนัส',
    token: 'Token',
    branch: 'สาขา',
    pos: 'POS',
    cashier: 'แคชเชียร์',
  };

  return (
    <div className="overflow-auto border rounded-lg shadow">
      <table className="min-w-full table-auto text-sm text-left text-gray-700">
        <thead className="bg-gray-200 text-gray-800 text-sm font-semibold">
          <tr>
            {headers.map((key) => (
              <th key={key} className={`px-4 py-2 ${typeof rows[0][key] === 'number' ? 'text-right' : ''}`}>
                 {columnNames[key] || key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {rows.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {headers.map((key) => (
                <td
                  key={key}
                  className={`px-4 py-2 ${
                    key === 'member' ? 'text-blue-600 underline cursor-pointer' : ''
                  } ${typeof row[key] === 'number' ? 'text-right' : ''}`}
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