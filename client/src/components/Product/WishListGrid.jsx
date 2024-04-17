import React, { useEffect, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Dialog, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function WishlistGrid() {
    const userID = "661575274bf91a5b120aaf42"

    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [filter, setFilter] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(Infinity);

    const sortingOptions = [
        { name: 'Price: Low to High', current: false },
        { name: 'Price: High to Low', current: false },
    ]
    const [sortOptions, setSortOptions] = useState(sortingOptions)
    const [sortOption, setSortOption] = useState('');

    useEffect(() => {
        const result = products.filter(product => {
            return (!filter || product.category === filter)
        });
        setFilteredProducts(result);
        setSortOptions(sortingOptions);
        setSortOption('');
        setMinPrice(0);
        setMaxPrice(Infinity);
    }, [filter, products]);

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleMinPriceChange = (event) => {
        setMinPrice(event.target.value);
    };

    const handleMaxPriceChange = (event) => {
        setMaxPrice(event.target.value);
    };

    const applyPriceFilter = () => {
        const result = products.filter(product => {
            return (!filter || product.category === filter) &&
                product.price >= minPrice && product.price <= maxPrice;
        });
        setFilteredProducts(result);
        setSortOptions(sortingOptions);
        setSortOption('');
    };

    // Handle sort option change
    const handleSortOptionChange = (option) => {
        setSortOption(option.name);
        setSortOptions(sortOptions.map(opt => {
            return {
                ...opt,
                current: opt.name === option.name
            };
        }));
        sortProducts(option.name);
    };

    // Sort products based on selected option
    const sortProducts = (optionName) => {
        const sortedProducts = [...filteredProducts].sort((a, b) => {
            switch (optionName) {
                case 'Price: Low to High':
                    return a.price - b.price;
                case 'Price: High to Low':
                    return b.price - a.price;
                default:
                    return 0;
            }
        });
        setFilteredProducts(sortedProducts);
    };

    // Fetch products when the component mounts
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/wishlist/fetchwishlist', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ client_id: userID })
                });

                if (!response.ok) {
                    throw new Error('Error');
                }

                const data = await response.json();
                console.log(data);
                setProducts(data);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };

        fetchProducts();
    }, []); // Empty dependency array ensures this runs once on mount


    return (
        <div className="bg-white">
            <div className="sticky w-full top-0">
                {/* Mobile filter dialog */}
                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                    <div className="flex items-center justify-between px-4">
                                        <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                                        <button
                                            type="button"
                                            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                            onClick={() => setMobileFiltersOpen(false)}
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    {/* Filters */}
                                    <div className="mt-4 border-t border-gray-200">

                                        {/* Subcategories */}
                                        {/* <h3 className="sr-only">Categories</h3>
                                        <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                                            {subCategories.map((category) => (
                                                <li key={category.name}>
                                                    <a href={category.href} className="block px-2 py-3">
                                                        {category.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul> */}

                                        {/* Categories Filter */}
                                        <div className="border-t border-gray-200 px-4 py-6">
                                            <label className="font-semibold text-gray-900 mb-2" htmlFor="category">Category</label>
                                            <select id="category" name="category" className="form-select mt-1 w-full text-sm" value={filter} onChange={handleFilterChange}>
                                                <option value="">All Categories</option>
                                                <option value="Electronics">Electronics</option>
                                                <option value="Clothing">Clothing</option>
                                                <option value="Accessories">Accessories</option>
                                            </select>
                                        </div>

                                        {/* Price Range Filter */}
                                        <div className="border-t border-gray-200 px-4 py-6">
                                            <label className="font-semibold text-gray-900 mb-2">Price Range</label>
                                            <div className="flex gap-3 items-center">
                                                <div className="flex gap-1 items-center mt-1">
                                                    <input
                                                        type="number"
                                                        className="form-input text-sm block w-full py-1 pl-1.5 pr-2.5 border-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out"
                                                        placeholder="Min"
                                                        min="0"
                                                        value={minPrice}
                                                        onChange={handleMinPriceChange}
                                                    />
                                                    -
                                                    <input
                                                        type="number"
                                                        className="form-input text-sm block w-full py-1 pl-1.5 pr-2.5 border-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out"
                                                        placeholder="Max"
                                                        min="0"
                                                        value={maxPrice}
                                                        onChange={handleMaxPriceChange}
                                                    />
                                                </div>

                                                <button
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1.5 px-3 rounded"
                                                    onClick={applyPriceFilter}
                                                >
                                                    Apply
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <div className="pt-6 pb-10">
                    <div className="flex justify-between border-b border-gray-200">
                        <h1 className="text-xl md:text-4xl font-bold tracking-tight text-gray-900 py-3 md:py-6">Products List</h1>

                        {/* Sorting */}
                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                        {sortOption || 'Sort'}
                                        <ChevronDownIcon
                                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            {sortOptions.map((option) => (
                                                <Menu.Item key={option.name}>
                                                    {({ active }) => (
                                                        <a
                                                            className={classNames(
                                                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                                active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm cursor-pointer'
                                                            )}
                                                            onClick={(e) => {

                                                                handleSortOptionChange(option);
                                                            }}
                                                        >
                                                            {option.name}
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>

                            <button
                                type="button"
                                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                onClick={() => setMobileFiltersOpen(true)}
                            >
                                <span className="sr-only">Filters</span>
                                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex">
                    {/* Filters */}
                    <div className="hidden lg:block pr-4 h-screen w-3/12 border-r">

                        {/* Categories Filter */}
                        <div className="border-b border-gray-200 pb-6">
                            <label className="font-semibold text-gray-900 mb-2" htmlFor="category">Category</label>
                            <select id="category" name="category" className="form-select mt-1 w-full text-sm" value={filter} onChange={handleFilterChange}>
                                <option value="">All Categories</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Accessories">Accessories</option>
                            </select>
                        </div>

                        {/* Price Range Filter */}
                        <div className="border-b border-gray-200 py-6">
                            <label className="font-semibold text-gray-900 mb-2">Price Range</label>
                            <div className="flex gap-3 items-center">
                                <div className="flex gap-1 items-center mt-1">
                                    <input
                                        type="number"
                                        className="form-input text-sm block w-full py-1 pl-1.5 pr-2.5 border-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out"
                                        placeholder="Min"
                                        min="0"
                                        value={minPrice}
                                        onChange={handleMinPriceChange}
                                    />
                                    -
                                    <input
                                        type="number"
                                        className="form-input text-sm block w-full py-1 pl-1.5 pr-2.5 border-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 ease-in-out"
                                        placeholder="Max"
                                        min="0"
                                        value={maxPrice}
                                        onChange={handleMaxPriceChange}
                                    />
                                </div>

                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1.5 px-3 rounded"
                                    onClick={applyPriceFilter}
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Product grid */}
                    <div className="lg:ml-12 w-full grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                        {filteredProducts.map((product) => (
                            <Link to={`/product/${product._id}`}>
                                <div key={product._id} className="group relative">
                                    {/* Product Image */}
                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 h-40 lg:h-80">
                                        <img src="..\assets\gray_bg.png" alt="Product" className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                                    </div>

                                    {/* Product Details */}
                                    <div className="mt-3 flex justify-between">
                                        <div>
                                            <h3 className="text-sm text-gray-700">
                                                <a href="#">
                                                    <span aria-hidden="true" className="absolute inset-0" />
                                                    {product.name}
                                                </a>
                                            </h3>
                                        </div>
                                        <p className="text-sm font-semibold text-gray-900">RS {product.price}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}