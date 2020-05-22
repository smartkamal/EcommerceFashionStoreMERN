import React, {useEffect,useState} from 'react'
import Axios from "axios";
import {API} from "../../Config";
import {Col, Container, Row} from "react-bootstrap";
import {isValidated} from "../../validators";
import StarRatingComponent from 'react-star-rating-component';

function Rating(props) {
    //hold state
    const [Rating,setRating] = useState(0)
    const [Ratings,setRatings] = useState(0)
    const [RatingAction,setRatingAction] = useState(null)
    const {user, token} = isValidated();
    const [allRatings, setAllRatings] = useState([]);

    let variables = {
        productId:props.productId,
    };

    //checking and getting ratings
    useEffect(() => {
        Axios.post(`${API}/rating/getRatings`,variables)
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



    },[Rating])


    //rating action
    const onRate = (nextValue, prevValue, name) => {

        setRating(nextValue)

        let variable = {
            productId:props.productId,
            userId:user._id,
            noOfStars:nextValue
        };

        console.log(variable)

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
        <React.Fragment>
            <Container style={{marginBottom: '30px'}}>
                <Row>
                    <Col xs={12}>
                        <div>
                            <br/>

                            <p> Rate this product </p>

                            <hr/>
                            <div>
                            </div>
                            <div>
                                <div>


                                    <StarRatingComponent
                                        name="rate1"
                                        starCount={5}
                                        size="5"
                                        value={Rating}
                                        onStarClick={onRate}
                                    />
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default Rating
