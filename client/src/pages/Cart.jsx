import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Header/Navbar";

const Cart = () => {
    const navigator = useNavigate();
    const user_id = localStorage.getItem("userID") || "661575274bf91a5b120aaf42";
    const [products, setProducts] = useState([]);
    const [tot_price, setTotalPrice] = useState(0);

    const updateTotalPrice = () => {
        fetch("http://localhost:4000/api/cart/getcartprice", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ customerID: user_id }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert(data.error);
                } else {
                    setTotalPrice(data.tot_price);
                }
            });
    };

    useEffect(() => {
        fetch("http://localhost:4000/api/prodcart/getcartitems", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ customerID: user_id }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert(data.error);
                } else {
                    setProducts(data);
                    console.log(products)
                    updateTotalPrice();
                }
            });
    }, []);

    const handleRemoveProduct = (productId) => {
        fetch("http://localhost:4000/api/prodcart/removefromcart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ customerID: user_id, productID: productId }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert(data.error);
                    navigator("/customerHome");
                } else {
                    alert(data.message);
                    fetch("http://localhost:3000/api/prodcart/getcartitems", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ customerID: user_id }),
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.error) {
                                alert(data.error);
                            } else {
                                setProducts(data);
                                updateTotalPrice();
                            }
                        });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to update cart.');
            });
    };

    const handleAddProduct = (productId) => {
        fetch("http://localhost:4000/api/prodcart/addtocart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ customerID: user_id, productID: productId }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert(data.error);
                    navigator("/customerHome");
                } else {
                    alert(data.message);
                    fetch("http://localhost:3000/api/prodcart/getcartitems", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ customerID: user_id }),
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.error) {
                                alert(data.error);
                            } else {
                                setProducts(data);
                                updateTotalPrice();
                            }
                        });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to update cart.');
            });
    };

    const handleCheckout = () => {
        fetch("http://localhost:4000/api/orders/createordersdiffvendors", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ customerId: user_id, products: products }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert(data.error);
                } else {
                    alert("Orders placed successfully for each vendor.");
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to place order.');
            });
    };

    return (
        <>
            <Navbar />

            <div className='pt-20'></div>

            <div className="text-2xl font-bold text-gray-800 text-center md:text-left">
                Your Cart
            </div>


            <div className="mx-auto p-6 flex flex-col md:flex-row md:space-x-10">
                {/* Cart Items */}
                <div className="flex-grow p-4 bg-white rounded-lg shadow-md mb-4 md:mb-0">
                    {products.map((product) => (
                        <div key={product._id} className="flex items-start justify-between border-b p-4">
                            <img
                                src={product.images && product.images.length > 0 ? product.images[0] : "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg"}
                                alt={product.name}
                                className="h-24 w-24 object-cover rounded mr-4"
                            />
                            <div className="flex flex-col justify-between flex-grow">
                                <p className="font-semibold text-gray-700">{product.name}</p>
                                <div className="flex justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">Category: {product.category}</p>
                                        <p className="text-sm text-gray-500">Price: Rs.{product.price}</p>
                                        <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="px-3 py-2 bg-red-600 text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                                            onClick={() => handleRemoveProduct(product._id)}>
                                            -
                                        </button>
                                        <button className="px-3 py-2 bg-green-600 text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                                            onClick={() => handleAddProduct(product._id)}>
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>

                {/* Summary Section */}
                <div className="w-full md:w-1/4 p-4 bg-gray-100 rounded-lg shadow-md z-10 md:ml-8">
                    <h2 className="font-bold text-xl text-gray-700 mb-4">Summary</h2>
                    <div className="mt-4">
                        <p className="text-gray-600">Items {products.length}</p>
                        {products.map((product) => (
                            <div key={product._id} className="flex items-start justify-between border-b p-4">
                                <div className="flex flex-col justify-between flex-grow">
                                    <p className="font-semibold text-gray-700">{product.name}</p>
                                    <div className="flex justify-between">
                                        <div>
                                            <p className="text-sm text-gray-500">Price: Rs.{product.price}</p>
                                            <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>

                    {/* Total Price */}
                    <div className="flex justify-between mt-4">
                        <p className="text-gray-600">Total Price:</p>
                        <p className="font-semibold text-gray-900">Rs.{parseFloat(tot_price)}</p>
                    </div>
                    <button className="w-full mt-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:shadow-lg transition duration-300 ease-in-out"
                        onClick={() => handleCheckout()}>
                        Checkout
                    </button>
                </div>
            </div>
        </>

    );
};

export default Cart;