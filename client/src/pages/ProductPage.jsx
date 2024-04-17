import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductPageInfo from '../components/Product/ProductPageInfo';
import ProductReviews from '../components/Product/ProductReviews';

// On clicking vendor name, link to vendor page!!!!!
// Add share option

// const product = {
//     name: 'Basic Tee 6-Pack',
//     price: '$192',
//     href: '#',
//     images: [
//         {
//             src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
//             alt: 'Two each of gray, white, and black shirts laying flat.',
//         },
//         {
//             src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
//             alt: 'Model wearing plain black basic tee.',
//         },
//         {
//             src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
//             alt: 'Model wearing plain gray basic tee.',
//         },
//         {
//             src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
//             alt: 'Model wearing plain white basic tee.',
//         },
//     ],
//     description:
//         'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
//     vendor: 'Olala Olala'
// }
const reviews = { href: '#', average: 4, totalCount: 117 }
const reviews_arr = [
    {
        id: 1,
        user: "John Doe",
        content: "Great quality tees, very comfortable to wear.",
        rating: 5,
    },
    {
        id: 2,
        user: "Jane Smith",
        content: "I love the colors! They haven't faded in the wash.",
        rating: 4,
    },
    {
        id: 3,
        user: "Jane Smith",
        content: "I love the colors! They haven't faded in the wash.",
        rating: 4,
    },
    {
        id: 4,
        user: "Jane Smith",
        content: "I love the colors! They haven't faded in the wash.",
        rating: 3,
    },
    {
        id: 5,
        user: "Jane Smith",
        content: "I love the colors! They haven't faded in the wash.",
        rating: 2,
    },
    {
        id: 6,
        user: "Jane Smith",
        content: "I love the colors! They haven't faded in the wash.",
        rating: 1,
    },
    {
        id: 7,
        user: "Jane Smith",
        content: "I love the colors! They haven't faded in the wash.",
        rating: 2,
    },
    {
        id: 8,
        user: "Jane Smith",
        content: "I love the colors! They haven't faded in the wash.",
        rating: 1,
    },
    {
        id: 9,
        user: "Jane Smith",
        content: "I love the colors! They haven't faded in the wash.",
        rating: 2,
    },
    {
        id: 10,
        user: "Jane Smith",
        content: "I love the colors! They haven't faded in the wash.",
        rating: 1,
    },
    {
        id: 11,
        user: "Jane Smith",
        content: "I love the colors! They haven't faded in the wash.",
        rating: 2,
    },
    {
        id: 12,
        user: "Jane Smith",
        content: "I love the colors! They haven't faded in the wash.",
        rating: 1,
    },
    {
        id: 13,
        user: "Jane Smith",
        content: "I love the colors! They haven't faded in the wash.",
        rating: 2,
    },
    {
        id: 14,
        user: "Jane Smith",
        content: "I love the colors! They haven't faded in the wash.",
        rating: 1,
    },
]

export default function ProductPage() {
    const { id } = useParams();
    const reviewRef = useRef(null);
    const [product, setProduct] = useState(null);
    const [reviews_arr, setReviewsArr] = useState([]);

    const scrollToReviews = () => {
        reviewRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const getProductById = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/product/fetchprod/${id}`);
                console.log('Product data:', response.data);
                if (!response.data.hasOwnProperty('images')) {
                    response.data.images = [
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
                setProduct(response.data);
                fetchReviews(id)
                // Assuming the product data contains a reviews array
                // setReviews(response.data.reviews || []);
            } catch (error) {
                console.error('Error fetching product:', error.response?.data || error.message);
            }
        };

        const fetchReviews = async (productId) => {
            try {
                const reviewsResponse = await axios.get(`http://localhost:4000/api/review/getreviews/${productId}`);
                console.log('Reviews data:', reviewsResponse.data);
                setReviewsArr(reviewsResponse.data);
            } catch (error) {
                console.error('Error fetching reviews:', error.response?.data || error.message);
            }
        };

        if (id) {
            getProductById();
        }
    }, [id]);

    if (product === null) {
        return
    }

    return (
        <>
            <ProductPageInfo product={product} reviews={reviews} scrollToReviews={scrollToReviews} />
            <ProductReviews ref={reviewRef} reviews={reviews_arr} />
        </>
    );

}
