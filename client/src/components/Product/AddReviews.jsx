import React, { useState } from 'react';
import StarRatings from 'react-star-ratings';
import axios from 'axios';

function AddReview(props) {
    const { customerId, productId } = props;

    const [review, setReview] = useState({
        rating: 0,
        review_text: ''
    });
    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState({bgColor: '', borderColor: ''}); // state for message colors

    const changeRating = (newRating) => {
        setReview(prevState => ({
            ...prevState,
            rating: newRating
        }));
        updateMessage(newRating);
        updateMessageColor(newRating); // update colors based on new rating
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReview(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const reviewData = {
            customer_id: customerId,
            product_id: productId,
            ...review
        };
    
        fetch('http://localhost:4000/api/product/addreview', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => {
                    throw new Error(data.message || 'Error adding review');
                });
            }
            return response.json();
        })
        .then(data => {
            alert('Review added successfully!');
            setReview({ rating: 0, review_text: '' });
            setMessage('');
            setMessageColor({bgColor: '', borderColor: ''});
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error adding review: ' + error.message);
        });
    };

    function updateMessage(rating) {
        if (rating >= 4) {
            setMessage('Thanks for the rating. Please tell us more!');
        } else if (rating > 0) {
            setMessage("Thanks for the rating. We're sorry to hear that, please tell us more so we can improve!");
        } else {
            setMessage('');
        }
    }

    function updateMessageColor(rating) {
        if (rating >= 4) {
            setMessageColor({bgColor: 'bg-green-400', borderColor: 'border-green-700'});
        } else if (rating === 3) {
            setMessageColor({bgColor: 'bg-yellow-400', borderColor: 'border-yellow-700'});
        } else if (rating <= 2 && rating > 0) {
            setMessageColor({bgColor: 'bg-red-400', borderColor: 'border-red-700'});
        } else {
            setMessageColor({bgColor: '', borderColor: ''});
        }
    }

    function ratingToEmoji(rating) {
        if (rating < 1) return '😴';
        if (rating < 2) return '😟';
        if (rating < 3) return '😐';
        if (rating < 4) return '😊';
        if (rating < 5) return '😄';
        return '🤩';
    }

    return (
        <div className="max-w-lg mx-auto p-4 shadow-lg rounded-xl mt-5">
            <h2 className="text-2xl font-bold mb-6 text-center">Review Product</h2>
            <div className="mb-4 flex items-center">
                <label className="block text-sm font-medium text-gray-700 mr-2">
                    Rating:
                </label>
                <StarRatings
                    rating={review.rating}
                    starRatedColor="#ffd700"
                    changeRating={changeRating}
                    numberOfStars={5}
                    name='rating'
                    starHoverColor="#ffd700"
                    starDimension="24px"
                    starSpacing="2px"
                />
                <span className="text-lg ml-2">{ratingToEmoji(review.rating)}</span>
            </div>
            {message && (
                <div className={`${messageColor.bgColor} ${messageColor.borderColor} border-l-4 text-white p-4 mb-4 rounded-lg flex items-center`}>
                    <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {message}
                </div>
            )}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Add Your Review:
                </label>
                <textarea
                    className="w-full h-32 p-2 text-sm border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500"
                    name="review_text"
                    value={review.review_text}
                    onChange={handleChange}
                    placeholder="Share your experience..."
                />
            </div>
            <button
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"
                type="submit"
                onClick={handleSubmit}
            >
                Submit Review
            </button>
        </div>
    );
}

export default AddReview;







// ONLY GREENNNN!!!

// import React, { useState } from 'react';
// import StarRatings from 'react-star-ratings';
// import axios from 'axios';

// function AddReview(props) {
//     const { customerId, productId } = props;

//     const [review, setReview] = useState({
//         rating: 0,
//         review_text: ''
//     });
//     const [message, setMessage] = useState('');

//     const changeRating = (newRating) => {
//         setReview(prevState => ({
//             ...prevState,
//             rating: newRating
//         }));
//         updateMessage(newRating);
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setReview(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const reviewData = {
//             customer_id: customerId,
//             product_id: productId,
//             ...review
//         };

//         axios.post('/api/reviews', reviewData)
//             .then(response => {
//                 alert('Review added successfully!');
//                 setReview({ rating: 0, review_text: '' });
//                 setMessage('');
//             })
//             .catch(error => {
//                 console.error('Error:', error);
//                 alert('Error adding review: ' + (error.response ? error.response.data.message : error.message));
//             });
//     };

//     function updateMessage(rating) {
//         if (rating >= 4) {
//             setMessage('Thanks for the rating. Please tell us more!');
//         } else if (rating > 0) {
//             setMessage("Thanks for the rating. We're sorry to hear that, please tell us more so we can improve!");
//         } else {
//             setMessage('');
//         }
//     }

//     function ratingToEmoji(rating) {
//         if (rating < 1) return '😴';
//         if (rating < 2) return '😟';
//         if (rating < 3) return '😐';
//         if (rating < 4) return '😊';
//         if (rating < 5) return '😄';
//         return '🤩';
//     }

//     return (
//         <div className="max-w-lg mx-auto p-4 shadow-lg rounded-xl mt-5">
//             <h2 className="text-2xl font-bold mb-6 text-center">Review Product</h2>
//             <div className="mb-4 flex items-center">
//                 <label className="block text-sm font-medium text-gray-700 mr-2">
//                     Rating:
//                 </label>
//                 <StarRatings
//                     rating={review.rating}
//                     starRatedColor="#ffd700"
//                     changeRating={changeRating}
//                     numberOfStars={5}
//                     name='rating'
//                     starHoverColor="#ffd700"
//                     starDimension="24px"
//                     starSpacing="2px"
//                 />
//                 <span className="text-lg ml-2">{ratingToEmoji(review.rating)}</span>
//             </div>
//             {message && (
//                 <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded-lg flex items-center">
//                     <svg className="w-6 h-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                     </svg>
//                     {message}
//                 </div>
//             )}
//             <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Add Your Review:
//                 </label>
//                 <textarea
//                     className="w-full h-32 p-2 text-sm border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500"
//                     name="review_text"
//                     value={review.review_text}
//                     onChange={handleChange}
//                     placeholder="Share your experience..."
//                 />
//             </div>
//             <button
//                 className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"
//                 type="submit"
//                 onClick={handleSubmit}
//             >
//                 Submit Review
//             </button>
//         </div>
//     );
// }

// export default AddReview;
