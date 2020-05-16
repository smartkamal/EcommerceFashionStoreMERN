import React, {Component} from 'react'
import Slider from 'react-slick';
import poster1 from './Image/poster1.jpg'

const photos = [
    {
        name: 'Photo1',
        url:'./Image/poster1.jpg'
    },
    {
        name: 'Photo2',
        url:"https://psn-shop.imgix.net/media/wysiwyg/GCN/Epic_Climbs_-_Homepage_Banner.jpg?auto=format&lossless=1"
    }
]

class Sliders extends Component {
    render() {
        const settings = {
            docs:true,
            fade:true,
            infinite:true,
            speed:500,
            slidesToShow:1,
            arrows:true,
            slidesToScroll:1,
            className: 'slides'
        }

        return(
            <div>
                <Slider {...settings}>
                    {photos.map((photos) => {
                        return(
                            <img width="100%" src="photos.url"/>
                    )
                })}
                </Slider>
            </div>
        )
    }
}

export default Sliders;
