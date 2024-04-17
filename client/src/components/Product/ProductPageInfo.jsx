import React, { useState, useEffect } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductPageInfo(props) {
    const product = props.product;
    const reviews = props.reviews;

    const vendorID = product.vendor || product.vendor_id
    const [vendorName, setvendorName] = useState('');

    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/user/getuserbyid', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ UserID: vendorID })
                });

                if (!response.ok) {
                    throw new Error('Error');
                }

                const data = await response.json();
                setvendorName(data.username);

            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        getUserDetails();
    }, [vendorID]);


    if (!product.hasOwnProperty('images')) {
        product.images = [
            {
                src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
                alt: 'Two each of gray, white, and black shirts laying flat.',
            },
            {
                src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
                alt: 'Model wearing plain black basic tee.',
            },
            {
                src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
                alt: 'Model wearing plain gray basic tee.',
            },
            {
                src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
                alt: 'Model wearing plain white basic tee.',
            }];
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
    };
    const [selectedImage, setSelectedImage] = useState(product.images[0]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const navigator = useNavigate(); // For navigation

    const handleChatClick = () => {
        navigator('/chat'); // Navigate to chat page
    };

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 pb-16 pt-8 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-4 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-8">
                {/* Image Section */}
                <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                    {/* Selected Image */}
                    <div className="aspect-h-3 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                        <img
                            src={selectedImage.src}
                            alt={selectedImage.alt}
                            className="w-full object-cover object-center"
                        />
                    </div>

                    {/* Image Thumbnails */}
                    <div className='mt-4 px-3'>
                        <Slider {...settings}>
                            {product.images.map((image, index) => (
                                <div className='justify-center p-2' key={index} onClick={() => { setSelectedImage(image); setSelectedIndex(index); }}>
                                    <img src={image.src} alt={image.alt}
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
                            <p className="text-xl tracking-tight text-gray-900">Rs {product.price}</p>

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
                    <form className="mt-10">
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
