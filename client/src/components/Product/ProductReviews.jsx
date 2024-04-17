import React, { useState } from 'react';

const ReviewsPerPage = 3; // Number of reviews displayed per page

const ProductReviews = React.forwardRef(({ reviews }, ref) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentReviews, setCurrentReviews] = useState(reviews.slice(
        (currentPage - 1) * ReviewsPerPage,
        currentPage * ReviewsPerPage
    ))
    const totalPages = Math.ceil(reviews.length / ReviewsPerPage);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        // If it's the first page, the last page, the current page, two pages before, or two pages after the current page.
        if (i === 1 || i === totalPages || (i >= currentPage - 3 && i <= currentPage + 3)) {
            pageNumbers.push(i);
        }
    }

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        setCurrentReviews(reviews.slice(
            (pageNumber - 1) * ReviewsPerPage,
            pageNumber * ReviewsPerPage
        ))
    };

    if (reviews.length === 0) {
        return (
            <div ref={ref} className="p-4 bg-white text-gray-900">
                <h3 className="text-2xl font-extrabold border-b-2 border-gray-200 pb-2 mb-4">
                    Customer Reviews
                </h3>
                <p className='text-lg'>No reviews yet.</p>
            </div>
        )
    }

    return (
        <div className="p-4 bg-white" ref={ref}>
            <h3 className="text-2xl font-extrabold text-gray-900 border-b-2 border-gray-200 pb-2 mb-4">
                Customer Reviews
            </h3>

            {currentReviews.map((review) => (
                <div key={review.id} className="mt-4 bg-white shadow rounded-lg overflow-hidden">
                    <div className="p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="text-base font-semibold mr-2">{review.user}</div>
                                <div className="flex text-yellow-400">
                                    {Array.from({ length: review.rating }, (_, i) => (
                                        <span key={i}>★</span>
                                    ))}
                                    {Array.from({ length: 5 - review.rating }, (_, i) => (
                                        <span key={i} className="text-gray-300">☆</span>
                                    ))}
                                </div>
                            </div>
                            <div className="text-xs text-gray-500">Posted on {review.date}</div>
                        </div>
                        <p className="text-gray-700 text-sm mt-2">{review.content}</p>
                    </div>
                </div>
            ))}

            {/* Pagination Bar */}
            <div className="flex justify-center items-center mt-4">
                {/* Previous Button */}
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 mx-1 border rounded"
                >
                    &lt;
                </button>

                {/* Pagination Buttons */}
                {pageNumbers.map((number, index) => {
                    if ((number !== 1 && number != totalPages) && (number === currentPage - 3 || number === currentPage + 3)) {
                        // Put ellipsis if there's a gap
                        return <span key={number} className="px-3 py-1 mx-1">...</span>;
                    } else {
                        return (
                            <button
                                key={number}
                                onClick={() => paginate(number)}
                                className={`px-3 py-1 mx-1 border rounded ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
                            >
                                {number}
                            </button>
                        );
                    }
                })}

                {/* Next Button */}
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 mx-1 border rounded"
                >
                    &gt;
                </button>
            </div>
        </div>
    );
});

export default ProductReviews;