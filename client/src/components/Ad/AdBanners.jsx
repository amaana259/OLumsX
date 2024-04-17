import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { register } from 'swiper/element/bundle';

//   const [ads, setAds] = useState([]);

//   useEffect(() => {
//     fetchAds();
//   }, [adCount]); // Depend on adCount to refetch when it changes

//   const fetchAds = async () => {
//     try {
//       const response = await axios.post('/getads', { count: adCount });
//       setAds(response.data); // Assuming the response data is the array of ads
//     } catch (error) {
//       console.error('Error fetching ads:', error);
//       // Handle error
//     }
//   };

export default function AdBanner({ adCount }) {
    register();

    const ads = [
        { src: 'https://via.placeholder.com/600x300?text=Ad+1', link: '#link1' },
        { src: 'https://via.placeholder.com/600x300?text=Ad+2', link: '#link2' },
        { src: 'https://via.placeholder.com/600x300?text=Ad+3', link: '#link3' },
    ];

    return (
        <div className="my-4">
            <div className="bg-zinc-500 rounded-md">
                <swiper-container
                    slides-per-view="1"
                    speed="1000"
                    autoplay-delay="5000"
                    loop="true"
                    pagination="true"
                >
                    {ads.map((ad, index) => (
                        <swiper-slide key={index}>
                            <a href={ad.link} target="#" rel="noopener noreferrer">
                                <img src={ad.src} alt={`Ad ${index}`} className="w-1/2 mx-auto" />
                            </a>
                        </swiper-slide>
                    ))}
                </swiper-container>
            </div>

        </div>
    );
}