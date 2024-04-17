import React, { useState, useEffect } from 'react';
import AddReview from '../components/Product/AddReviews';
import Navbar from '../components/Header/Navbar';

const CustomerOrderHistory = () => {
  const user_id = localStorage.getItem("userID") || "661575274bf91a5b120aaf42";

  const [allOrders, setAllOrders] = useState([]);
  const [visibleOrderDetailsId, setVisibleOrderDetailsId] = useState(null);
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    const interval = setInterval(fetchOrders, 5000);
    fetchOrders();
    return () => clearInterval(interval);
  }, [user_id]);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/orders/customerorders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customerID: user_id }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const ordersData = await response.json();
      setAllOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setAllOrders([]);
    }
  };

  const handleViewProductDetails = async (orderID) => {
    if (visibleOrderDetailsId !== orderID) {
      try {
        const response = await fetch('http://localhost:4000/api/orders/fetchproddetails', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderID: orderID }),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const productData = await response.json();
        console.log(productData);
        setProductDetails(productData);
        setVisibleOrderDetailsId(orderID);  // Show details for this order
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    } else {
      setVisibleOrderDetailsId(null);  // Hide details
    }
  };

  const [visibleReviewProductId, setVisibleReviewProductId] = useState(null);

  const openReviewModal = (productId) => {
    setVisibleReviewProductId(productId);
  };

  return (
    <>
      <Navbar />

      <div className='pt-12'></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold text-gray-900 my-8 text-center">My Orders</h1>
        <div className="space-y-8">
          {allOrders.length > 0 ? allOrders.map((order) => (
            <div key={order._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="px-6 py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl leading-6 font-semibold text-gray-900">Order ID: {order._id}</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Order Status: {order.status ? <span className="text-green-500 font-semibold">Confirmed</span> : <span className="text-orange-500 font-semibold">Pending</span>}
                    </p>
                    <p className="text-sm text-gray-500">Total Amount: ${order.bill}</p>
                  </div>
                  <button
                    onClick={() => handleViewProductDetails(order._id)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    {visibleOrderDetailsId === order._id ? 'Hide Products' : 'View Products'}
                  </button>
                </div>
                {visibleOrderDetailsId === order._id && (
                  <div className="mt-4">
                    {productDetails.map((product) => (
                      <div key={product.productId} className="flex items-start border-t border-gray-200 pt-4">
                        <img
                          src={product.images && product.images.length > 0 ? product.images[0] : "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg"}
                          alt={product.name}
                          className="flex-none w-48 h-48 object-cover rounded-lg mr-8"
                        />
                        <div className="flex-grow">
                          <h4 className="text-lg font-medium text-gray-900">{product.name}</h4>
                          <p className="text-sm text-gray-500">{product.description}</p>
                          <p className="text-sm text-gray-500">Category: {product.category}</p>
                          <p className="text-sm text-gray-500">Price: ${product.price}</p>
                          <button
                            onClick={() => openReviewModal(product.productId)}
                            className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded"
                          >
                            Add Review
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )) : (
            <p className="text-center text-gray-500 text-xl">No orders found.</p>
          )}
        </div>

        {visibleReviewProductId && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="relative bg-white p-5 rounded-lg shadow-lg max-w-lg w-full flex flex-col justify-center items-center">
              <AddReview productId={visibleReviewProductId} />
              <button
                onClick={() => setVisibleReviewProductId(null)}
                className="absolute top-0 right-0 mt-2 mr-2 bg-transparent hover:bg-gray-200 p-2 rounded-full"
                aria-label="Close"
              >
                <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}


      </div>
    </>

  );
};

export default CustomerOrderHistory;