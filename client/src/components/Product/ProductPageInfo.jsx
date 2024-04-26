import React, { useState, useEffect } from 'react';
import { StarIcon, HeartIcon } from '@heroicons/react/20/solid';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductPageInfo(props) {
    const customerID = localStorage.getItem("userId") || "661575274bf91a5b120aaf42";
    const product = props.product;
    const reviews = props.reviews;

    const vendorID = product.vendor || product.vendor_id
    const [vendorName, setVendorName] = useState('');

    const [isWishlisted, setIsWishlisted] = useState(product.wishlisted);

    useEffect(() => {
        const checkIfProductIsWishlisted = async () => {
            try {
                const response = await axios.post('https://olumsx-backend-deploy-new.vercel.app/api/wishlist/checkwishlist', {
                    client_id: customerID,
                    product_id: product._id
                });
                setIsWishlisted(response.data.isWishlisted);
                if (response.data.isWishlisted) {
                    console.log('Product is wishlisted.');
                } else {
                    console.log('Product is not wishlisted.');
                }
            } catch (error) {
                console.error('Error checking the wishlist:', error);
            }
        };

        checkIfProductIsWishlisted();
    }, []);

    useEffect(() => {
        axios.post('https://olumsx-backend-deploy-new.vercel.app/api/user/getuserbyid', { UserID: vendorID }, {
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            setVendorName(response.data.username);
        }).catch(error => {
            console.error('Error fetching user details:', error);
        });
    }, [vendorID]);

    const toggleWishlist = async () => {
        const url = `https://olumsx-backend-deploy-new.vercel.app/api/wishlist/${isWishlisted ? 'removewishlist' : 'addwishlist'}`;
        try {
            await axios.post(url, {
                client_id: customerID,
                product_id: product._id
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            // Toggle the state to reflect the change
            setIsWishlisted(!isWishlisted);
            alert(`Product ${isWishlisted ? 'removed from' : 'added to'} wishlist successfully!`);
        } catch (error) {
            console.error(`Error ${isWishlisted ? 'removing from' : 'adding to'} wishlist:`, error);
            alert(`Failed to ${isWishlisted ? 'remove product from' : 'add product to'} wishlist`);
        }
    };

    if (!product.hasOwnProperty('imageUrls')) {
        product.imageUrls = ['https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg', 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg', 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg', 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg'];
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
    };
    const [selectedImage, setSelectedImage] = useState(product.imageUrls[0]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const navigator = useNavigate(); // For navigation

    const handleChatClick = () => {
        navigator(`/fullchatcustomer/${vendorID}`); // Navigate to chat page
    };

    const addToCart = async () => {
        try {
            const response = await fetch(`https://olumsx-backend-deploy-new.vercel.app/api/prodcart/addtocart`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ customerID: customerID, productID: product._id })
            });
            if (!response.ok) throw new Error('Failed to add product to cart');
            alert('Product added to cart successfully!');
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Failed to add product to cart');
        }
    };

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 pb-16 pt-8 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-4 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-8">
                {/* Image Section */}
                <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                    {/* Selected Image */}
                    <div className="aspect-h-3 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                        <img
                            src={selectedImage}
                            alt={"Img"}
                            className="w-full object-cover object-center"
                        />
                    </div>

                    {/* Image Thumbnails */}
                    <div className='mt-4 px-3'>
                        <Slider {...settings}>
                            {product.imageUrls.map((image, index) => (
                                <div className='justify-center p-2' key={index} onClick={() => { setSelectedImage(image); setSelectedIndex(index); }}>
                                    <img src={image} alt={"Product Image"}
                                        className={`inset-0 object-cover h-20 w-20 rounded-md overflow-hidden cursor-pointer ${index === selectedIndex ? 'outline outline-3 outline-blue-500' : ''}`}
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>

                <div className="lg:col-span-2 lg:pr-8">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl mb-6">{product.name}</h1>

                    <div className='md:flex md:justify-between'>
                        <div className=''>
                            <div className="flex items-center">
                                <p className="text-xl tracking-tight text-gray-900">Rs {product.price}</p>
                                {/* Conditional Heart Icon for Wishlist */}
                                <HeartIcon
                                    className={`ml-3 h-6 w-6 cursor-pointer ${product.wishlisted ? 'text-red-500' : 'text-gray-400'}`}
                                    onClick={toggleWishlist}
                                />
                            </div>

                            {/* Review Stars */}
                            <div className="mt-6">
                                <h3 className="sr-only">Reviews</h3>
                                <div className="flex items-center">
                                    <div className="flex items-center">
                                        {[0, 1, 2, 3, 4].map((rating) => (
                                            <StarIcon
                                                key={rating}
                                                className={classNames(
                                                    reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                                                    'h-5 w-5 flex-shrink-0'
                                                )}
                                                aria-hidden="true"
                                            />
                                        ))}
                                    </div>
                                    <p className="sr-only">{reviews.average} out of 5 stars</p>
                                    <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500" onClick={(e) => {
                                        e.preventDefault();
                                        props.scrollToReviews();
                                    }}>
                                        {reviews.totalCount} reviews
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-column w-1/2 justify-center items-end md:border-l-2">
                            <div className='w-fit'>
                                <div className='flex items-baseline gap-2'>
                                    <h3 className="text-md font-medium text-gray-600 italic">Sold by:</h3>
                                    <h3 className="text-lg font-medium text-gray-900">{vendorName}</h3>
                                </div>

                                <button onClick={handleChatClick} className="mt-3 inline-flex items-center justify-center py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full">
                                    Chat with Vendor
                                </button>
                            </div>

                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <form className="mt-10" onSubmit={(e) => {
                        e.preventDefault();
                        addToCart();
                    }}>
                        <button
                            type="submit"
                            className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Add to Cart
                        </button>
                    </form>

                    {/* Description*/}
                    <div className="py-10 lg:pb-16 lg:pt-6 text-justify space-y-3">
                        <h2 className='text-base font-semibold'>Description:</h2>
                        <p className="text-base text-gray-900">{product.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
