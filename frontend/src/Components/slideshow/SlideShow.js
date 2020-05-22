import React from 'react';
import { Zoom } from 'react-slideshow-image';
import poster11 from './Image/poster11.jpg'
import poster10 from './Image/poster10.png'
import poster8 from './Image/poster8.jpg'
import poster9 from './Image/poster9.png'
import poster12 from './Image/poster12.jpg'
import './slide.css'

const fadeImages = [
    poster11,
    poster10,
    poster8,
    poster9,
    poster12

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