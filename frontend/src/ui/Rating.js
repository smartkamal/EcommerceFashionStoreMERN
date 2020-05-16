import React, {useEffect,useState} from 'react'
import {FaStar} from 'react-icons/fa'
import Axios from "axios";
import {API} from "../Config";
import {Tooltip} from "antd";
import {LikeFilled, LikeOutlined, StarFilled, StarOutlined} from "@ant-design/icons";
import {Col, Container, Row} from "react-bootstrap";

function Rating(props) {
    const [Rating,setRating] = useState(0)
    const [RatingAction,setRatingAction] = useState(null)
    const [rating] = useState(null)
    const [hover,setHover] = useState(null)

    let variable = {
        productId:props.productId,
        userId:props.userId,
    }

    useEffect(() => {
        Axios.post(`{API}/ratings/getRatings`,variable)
            .then(response => {
                if (response.data.success) {
                    setRating(response.data.likes.length)

                    response.data.likes.map(rating => {
                        if (rating.userId === props.userId) {
                            setRatingAction('rated')
                        }
                    })
                }else{
                    alert('Failed to get ratings')
                }
            })
    },[])

    const onRate = () => {
        if (RatingAction == null){
            Axios.post(`{API}/like/uplike`)
                .then(response => {
                    if (response.data.success) {
                        setRating(Rating+1)
                        setRatingAction('rated')
                    }else{
                        alert('Failed to get increase the rating')
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
                                <FaStar className="star" color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"} size={25}/>
                            </label>
                        ) ;
                })}
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    )
}

export default Rating
