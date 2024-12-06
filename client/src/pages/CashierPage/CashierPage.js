import React, { useState, useEffect } from 'react';
import './CashierPage.css';
import { useNavigate } from 'react-router-dom';
import { getOrders } from '../../api/GetOrders';
import Logo from "../../assets/images/logo.png";
import UncompletedOrderDetails from '../../components/UncompletedOrderDetails/UncompletedOrderDetails';
import { deleteOrder } from '../../api/DeleteOrder';
import { completeOrder } from '../../api/CompleteOrder';
import ReactPaginate from 'react-paginate';

function CashierPage() {
  const [activePage] = useState("Uncompleted Orders");
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
        const data = await getOrders();
        const sortedData = data.sort((a, b) => b.ordernum - a.ordernum);
        setOrders(sortedData);
        setSortConfig({ key: 'ordernum', direction: 'descending' });
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

  const handleOrderDelete = async (orderNum) => {
    try {
      await deleteOrder(orderNum);
      // Update the orders state by filtering out the deleted order
      setOrders(prevOrders => prevOrders.filter(order => order.ordernum !== orderNum));
      setSelectedOrder(null); // Clear the selected order
      // Optionally, you can add a success message here
    } catch (error) {
      console.error('Failed to delete order:', error);
      // Optionally, you can add an error message here
    }
  };

  const handleOrderComplete = async (orderNum) => {
    try {
      await completeOrder(orderNum);
      // Update the orders state by filtering out the completed order
      setOrders(prevOrders => prevOrders.filter(order => order.ordernum !== orderNum));
      setSelectedOrder(null); // Clear the selected order
      // Optionally, you can add a success message here
    } catch (error) {
      console.error('Failed to complete order:', error);
      // Optionally, you can add an error message here
    }
  };

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
      if (sortConfig.key === 'ordernum' || sortConfig.key === 'name' || sortConfig.key === 'price') {
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

  // Handle navigation clicks
  const handleNavClick = (text) => {
    if (text === "Uncompleted Orders") {
      navigate("/cashier", { state: { role: "cashier" } }); // Navigate to Order History page
    } 
    else if (text === "New Order") {
      navigate("/new-order", { state: { role: "cashier" } }); // Navigate to Inventory page
    } 
    // else if (text === "Food Items") {
    //   navigate("/fooditems"); // Navigate to Items page
    // } 
    // else if (text === "Employees") {
    //   navigate("/employees"); // Navigate to Employee page
    // }
    // else if (text === "Reports") {
    //   navigate("/reports"); // Navigate to Reports page
    // }
  };
  
  return (
    <div>
      <div className="cashier-header-container">
        <img src={Logo} alt="Logo" className="logo"/>
        <h1>Cashier</h1>
        <div className='bar'></div>
        
        {/* Manager Navigation */}
        <div className='manager-nav'>
          <span 
            onClick={() => handleNavClick("Uncompleted Orders")}
            className={activePage === "Uncompleted Orders" ? "active-nav" : ""}
          >
            Uncompleted Orders
          </span>
          <span 
            onClick={() => handleNavClick("New Order")}
            className={activePage === "Inventory" ? "active-nav" : ""}
          >
            New Order
          </span>
        </div>

        <div className="header-right">
            <button className='sign-out-button' onClick={() => navigate('/')}>Sign Out</button>
        </div>
      </div>
      
      <div className="order-history-wrapper">
        <div className="order-history-container">
          <h1>Uncompleted Orders</h1>
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
                      <th onClick={() => sortData('name')} className="sortable-header">
                        Customer ID {sortConfig.key === 'name' && (
                          <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                        )}
                      </th>
                      <th onClick={() => sortData('price')} className="sortable-header">
                        Order Price {sortConfig.key === 'price' && (
                          <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                        )}
                      </th>
                      {/* <th onClick={() => sortData('timecompleted')} className="sortable-header">
                        Time Completed {sortConfig.key === 'timecompleted' && (
                          <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                        )}
                      </th> */}
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
                        <td>{order.name}</td>
                        <td>{order.price}</td>
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
            <UncompletedOrderDetails 
            selectedOrder={selectedOrder} 
            onClose={() => setSelectedOrder(null)}
            onDelete={handleOrderDelete}
            onComplete={handleOrderComplete}
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

export default CashierPage;
