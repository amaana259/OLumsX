import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductPageInfo from '../components/Product/ProductPageInfo';
import ProductReviews from '../components/Product/ProductReviews';
import Navbar from '../components/Header/Navbar';

// On clicking vendor name, link to vendor page!!!!!
// Add share option

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

    const averageRating = reviews_arr.length > 0
        ? reviews_arr.reduce((acc, review) => acc + review.rating, 0) / reviews_arr.length
        : 0;
    const numReviews = reviews_arr.length
    const reviews = { average: averageRating, totalCount: numReviews }

    return (
        <>
            <Navbar />

            <div className='pt-16'></div>

            <ProductPageInfo product={product} reviews={reviews} scrollToReviews={scrollToReviews} />
            <ProductReviews ref={reviewRef} reviews={reviews_arr} />
        </>
    );

}
