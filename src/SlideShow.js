import React, { useState, useEffect } from 'react';
import banner3 from './images/banner3.png';
import banner4 from './images/banner4.png';
// import banner2 from './images/banner2.png';


const SlideShow = () => {
    const images = [
        banner3,
        banner4,
        banner3
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 10000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="slide-show">
            <img src={images[currentIndex]} alt={`slide ${currentIndex}`} className="slide-image" />
        </div>
    );
};

export default SlideShow;