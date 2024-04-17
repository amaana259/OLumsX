import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
    // const [cartItems, setCartItems] = useState([]);
    const [cartItems, setCartItems] = useState([
        { _id: '1', name: 'Laptop', price: 999, quantity: 1, images: [""] },
        { _id: '2', name: 'Smartphone', price: 699, quantity: 2, images: ["../assets/gray_bg.png"] },
        { _id: '3', name: 'Headphones', price: 199, quantity: 1, images: ["../assets/gray_bg.png"] },
    ]);

    // useEffect(() => {
    //     const fetchCartItems = async () => {
    //         const { data } = await axios.get('/api/cart');
    //         setCartItems(data);
    //     };

    //     fetchCartItems();
    // }, []);

    const handleRemove = async (id) => {
        // await axios.delete(`/api/cart/${id}`);
        setCartItems(cartItems.filter(item => item._id !== id));
    };

    const handleQuantityChange = async (id, newQuantity) => {
        // await axios.put(`/api/cart/${id}`, { quantity: newQuantity });
        setCartItems(
            cartItems.map(item =>
                item._id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            {cartItems.map(item => (
                <div key={item._id} className="flex items-center justify-between border-b-2 py-4">
                    <div className="flex-1 flex items-center space-x-4">
                        {item.images.length > 0 && (
                            <img
                                src={item.images[0]}
                                alt={item.name}
                                className="h-20 w-20 object-cover rounded-md"
                            />
                        )}
                        <div>
                            <h3 className="text-lg font-semibold">{item.name}</h3>
                            <p className="text-gray-700">${item.price}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                            className="px-3 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none"
                        >
                            -
                        </button>
                        <span className="text-lg">{item.quantity}</span>
                        <button
                            onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                            className="px-3 py-1 bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none"
                        >
                            +
                        </button>
                    </div>
                    <button
                        onClick={() => handleRemove(item._id)}
                        className="ml-4 text-sm text-red-500 hover:text-red-700"
                    >
                        Remove
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Cart;
