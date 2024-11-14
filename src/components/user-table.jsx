import React from 'react';
import "./user-table.css";

export const UserTable = ({ data, columns, renderCellContent = customCellRenderer }) => {
  return (
    <table className="user-table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {columns.map((col) => (
              <td key={col}>
                {renderCellContent
                  ? renderCellContent(row[col], row, col) 
                  : row[col]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};


const customCellRenderer = (cellData, row, column) => {
  if (column === 'image') {
    return (
      <img
        src={cellData}
        alt={`${row.name}'s avatar`}
        style={{ width: '50px', height: '50px', borderRadius: '50%' }}
      />
    );
  }
  if (column === 'name') {
    return <strong>{cellData}</strong>;
  }
  return cellData;
};
