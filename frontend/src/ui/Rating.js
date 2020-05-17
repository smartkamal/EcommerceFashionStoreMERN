import React, {useEffect,useState} from 'react'
import {FaStar} from 'react-icons/fa'
import Axios from "axios";
import {API} from "../Config";
import {Tooltip} from "antd";
import {LikeFilled, LikeOutlined, StarFilled, StarOutlined} from "@ant-design/icons";
import {Col, Container, Row} from "react-bootstrap";

const Star = ({ starId, rating, onMouseEnter, onMouseLeave, onClick }) => {
    let styleClass = "star-rating-blank";
    if (rating && rating >= starId) {
        styleClass = "star-rating-filled";
    }

    return (
        <div
            className="star"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
        >
            <svg
                height="55px"
                width="53px"
                class={styleClass}
                viewBox="0 0 25 23"
                data-rating="1"
            >
                <polygon
                    stroke-width="0"
                    points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"
                />
            </svg>
        </div>
    );
};

function Rating(props) {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const stars = [1, 2, 3, 4, 5];
    const [Ratings,setRatings] = useState(0)
    const [RatingAction,setRatingAction] = useState(null)

    let variable = {
        productId:props.productId,
        userId:props.userId,
        noOfStars:props.noOfStars,
    };

    useEffect(() => {
        Axios.post(`${API}/rating/getRatings`,variable)
            .then(response => {
                if (response.data.success) {
                    setRatings(response.data.ratings.length)

                    response.data.ratings.map(like => {
                        if (like.userId === props.userId){
                            setRatingAction('rated')
                        }
                    })
                }else{
                    alert('Failed to get ratings')
                }
            })
    },[])

    const onRate = () => {
        if (RatingAction ===null){
            Axios.post(`${API}/rating/uprate`,variable)
                .then(response => {
                    if (response.data.success){
                        setRatings(Ratings+1)
                        setRatingAction('rated')
                    }else{
                        alert("failed to increase the rating")
                    }
                })
        }
    }

    return(
        (
            <Container style={{marginBottom: '30px'}}>
                <Row>
                    <Col xs={12}>
                        <div>
                            <br/>
                            <p> Rate this prodouct </p>
                            <hr/>
                            <div>
                                <span>{Ratings} users has rated this product</span>
                            </div>
                                <div className="flex-container">
                                    {stars.map((star, i) => (
                                        <Star
                                            key={i}
                                            starId={i}
                                            rating={hoverRating || rating}
                                            onMouseEnter={() => setHoverRating(i)}
                                            onMouseLeave={() => setHoverRating(0)}
                                            onClick={onRate}
                                        />
                                    ))}
                                </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    )
}

export default Rating
