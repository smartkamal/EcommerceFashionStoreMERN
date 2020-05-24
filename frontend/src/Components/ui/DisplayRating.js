import React, {useEffect,useState} from 'react'
import StarRatingComponent from 'react-star-rating-component';
import {API} from "../../Config";

function DisplayRating(props) {

    //hold state
    const [allRatings, setRatings] = useState([]);

    //get added ratings
     const getRatings = () =>{
        return fetch(`${API}/rating/getAll`,{
            method: "GET"
        })
            .then(response =>{
                return response.json();
            })
            .catch(err=> console.log(err));
    }

    //load the rating
    const loadRatings = () =>{
         getRatings().then(content => {
             if(content.error){
                 console.log("error");
             }else{
                 setRatings(content);
             }
         })
    }

    useEffect(() => {
        loadRatings();
        // eslint-disable-next-line
    },[])



    return(


                <div>
                    {/*eslint-disable-next-line*/}
                    {allRatings.map((ratings, index ) => {

                        if(ratings._id === props.pID ){

                                return(
                                    <div key={index}>
                                        <StarRatingComponent
                                            name="rate1"
                                            starCount={5}
                                            size="10"
                                            value={ratings.avg}
                                            className="mr-5"
                                        />
                                    </div>
                                )

                        }

                    }

                    )}

                </div>

    )

};

export default DisplayRating
