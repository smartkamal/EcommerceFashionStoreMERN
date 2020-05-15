import React, {useEffect,useState} from 'react'
import {FaStar} from 'react-icons/fa'

function DisplayRating(props) {
    const [rating,setRating] = useState(null)
    const [hover,setHover] = useState(null)

    return(
        <div>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i+1;

                return(
                    <label>
                        <input
                            type="radio"
                            name="rating"
                            style={{display: 'none'}}
                            value={ratingValue}
                            onClick={() => setRating(ratingValue)}
                        />
                        <FaStar className="star" color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"} size={15}
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={() => setHover(ratingValue)}/>
                    </label>
                ) ;
            })}
        </div>
    );
};

export default DisplayRating
