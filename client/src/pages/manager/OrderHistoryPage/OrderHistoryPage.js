import React, { useState, useEffect } from 'react';
import './OrderHistoryPage.css';
import { useNavigate } from 'react-router-dom';
import { getOrderHistory } from '../../../api/GetOrderHistory.js';
import MenuItemsDetails from '../../../components/MenuItemsDetails/MenuItemsDetails';
import ManagerHeader from '../../../components/ManagerHeader/ManagerHeader';
import ReactPaginate from 'react-paginate';

function OrderHistoryPage() {
  const [activePage] = useState("Order History");
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const navigate = useNavigate();
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending'
  });
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await getOrderHistory();
        setOrders(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
        setError('Failed to load orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleRowsPerPageChange = (event) => {
    const newRowsPerPage = event.target.value === 'all' 
      ? (filteredOrders?.length || 0) 
      : parseInt(event.target.value);
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(0);
  };

  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
  };
  
  // Filter orders based on search term
  const filteredOrders = orders.filter(order => 
    Object.values(order).some(value => 
      value !== null && // Check for null
      value !== undefined && // Check for undefined
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortData = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = (data) => {
    if (!sortConfig.key) return data;
  
    return [...data].sort((a, b) => {
      if (a[sortConfig.key] === null || a[sortConfig.key] === undefined) return 1;
      if (b[sortConfig.key] === null || b[sortConfig.key] === undefined) return -1;
  
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];
  
      // Convert to numbers for numerical columns
      if (sortConfig.key === 'ordernum' || sortConfig.key === 'customerid' || sortConfig.key === 'employeeid') {
        aValue = Number(aValue);
        bValue = Number(bValue);
      }
  
      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  };

  // Pagination logic
  const sortedData = getSortedData(filteredOrders);
  const pageCount = Math.ceil(sortedData.length / rowsPerPage);
  const offset = currentPage * rowsPerPage;
  const currentOrders = sortedData.slice(offset, offset + rowsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  
  return (
    
    <div>
      <ManagerHeader activePage={activePage} />
      
      <div className="order-history-wrapper">
        <div className="order-history-container">
          <h1>Order History</h1>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        
          <div className="orders-table-container">
            {loading ? (
              <p>Loading orders...</p>
            ) : error ? (
              <p className="error-message">{error}</p>
            ) : (
              <>
                <table className="orders-table">
                  <thead>
                    <tr>
                      <th onClick={() => sortData('ordernum')} className="sortable-header">
                        Order # {sortConfig.key === 'ordernum' && (
                          <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                        )}
                      </th>
                      <th onClick={() => sortData('customerid')} className="sortable-header">
                        Customer ID {sortConfig.key === 'customerid' && (
                          <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                        )}
                      </th>
                      <th onClick={() => sortData('employeeid')} className="sortable-header">
                        Employee ID {sortConfig.key === 'employeeid' && (
                          <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                        )}
                      </th>
                      <th onClick={() => sortData('timecompleted')} className="sortable-header">
                        Time Completed {sortConfig.key === 'timecompleted' && (
                          <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                        )}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {getSortedData(currentOrders).map((order) => (
                      <tr
                        key={order.ordernum}
                        onClick={() => handleOrderSelect(order)}
                        className={selectedOrder?.ordernum === order.ordernum ? 'selected-row' : ''}
                      >
                        <td>{order.ordernum}</td>
                        <td>{order.customerid}</td>
                        <td>{order.employeeid}</td>
                        <td>{order.timecompleted}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="pagination-container">
                  <div className="rows-per-page">
                    <label htmlFor="rows-select">Rows per page:</label>
                    <select
                      id="rows-select"
                      value={rowsPerPage === filteredOrders.length ? 'all' : rowsPerPage}
                      onChange={handleRowsPerPageChange}
                      className="rows-select"
                    >
                      <option value="10">10</option>
                      <option value="15">15</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                      <option value="all">All</option>
                    </select>
                  </div>
                  <ReactPaginate
                    previousLabel={"← Previous"}
                    nextLabel={"Next →"}
                    pageCount={Math.ceil(filteredOrders.length / rowsPerPage)}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    previousLinkClassName={"pagination__link"}
                    nextLinkClassName={"pagination__link"}
                    disabledClassName={"pagination__link--disabled"}
                    activeClassName={"pagination__link--active"}
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="details-container">
          {selectedOrder ? (
            <MenuItemsDetails
              selectedOrder={selectedOrder}
              onClose={() => setSelectedOrder(null)}
            />
          ) : (
            <div className="placeholder-panel">
              <p>Select an order to view details</p>
            </div>
          )}
        
      </div></div>
    </div>
  );
}

export default OrderHistoryPage;