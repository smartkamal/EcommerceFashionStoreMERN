import React from 'react';
import { Zoom } from 'react-slideshow-image';
import poster1 from './Image/poster1.jpg'
import poster2 from './Image/poster2.jpg'
import poster8 from './Image/poster8.jpg'
import './slide.css'

const fadeImages = [
    poster1,
    poster2,
    poster8,
];

const zoomOutProperties = {
    duration: 3000,
    transitionDuration: 500,
    infinite: true,
    indicators:true,
    scale: 0.4,
    arrows: true
}

const SlideShow = () => {
    return (
        <div className="slide-container">
            <Zoom {...zoomOutProperties} >
                {
                    fadeImages.map((each, index) => <img key={index} style={{width: "100%"}} src={each}  alt="images"/>)

                }
            </Zoom>
        </div>
    )
}
export default SlideShow;