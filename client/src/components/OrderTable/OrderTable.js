import React, { useState, useEffect } from 'react';
import './OrderTable.css';
import { getOrders } from '../../api/GetOrders.js';
import { tableCustomStyles } from './OrderTable.jsx';
import DataTable from 'react-data-table-component';

const columns = [
  {
    name: 'Order number',
    selector: row => row.ordernum,
    sortable: true
  },
  {
    name: 'Customer Name',
    selector: row => row.name,
    sortable: true
  },
  {
    name: 'Price',
    selector: row => row.price,
    sortable: true
  },
];

function OrderTable({ data, setData, onSelectItem }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const fetchedData = await getOrders();
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [setData]);

  const handleRowClick = (row) => {
    onSelectItem(row);
  };

  return (
    <div className='order-table'>
      <DataTable
        columns={columns}
        data={data}
        pagination
        striped
        progressPending={loading}
        customStyles={tableCustomStyles}
        onRowClicked={handleRowClick}
        pointerOnHover
        highlightOnHover
      />
    </div>
  );
}

export default OrderTable;