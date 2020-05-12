import React, {useEffect,useState} from 'react'
import {Tooltip} from "antd";
import Axios from "axios";
import Icon from "antd/es/icon";
import {API} from "../Config";

function LikesDislikes(props) {
    const [Likes,setLikes] = useState(0)
    const [Dislikes,SetDislikes] = useState(0)
    const [LikeAction,setLikeAction] = useState(null)
    const [DislikeAction,setDislikeAction] = useState(null)

    let variable = {
        commentId:props.commentId,
        userId:props.userId
    };

    useEffect(() => {
        Axios.post(`${API}/like/getLikes`,variable)
            .then(response => {
                if (response.data.success) {
                    setLikes(response.data.likes.length)

                    response.data.likes.map(like => {
                        if (like.userId === props.userId){
                            setLikeAction('liked')
                        }
                    })
                }else{
                    alert('Failed to get likes')
                }
            })

        Axios.post(`${API}/like/getDislikes`,variable)
            .then(response => {
                if (response.data.success) {
                    SetDislikes(response.data.dislikes.length)

                    response.data.dislikes.map(like => {
                        if (like.userId === props.userId){
                            setDislikeAction('disliked')
                        }
                    })
                }else{
                    alert('Failed to get dislikes')
                }
            })
    },[])

    return(
        <div>
            <React.Fragment>
                <span key="comment-basic-like">
                    <Tooltip title="like">
                        <Icon type="like"
                                theme={LikeAction === 'liked' ? 'filled' : 'outlined'}
                                onClick
                        />
                    </Tooltip>
                    <span style={{paddingLeft:'8px', cursor:'auto'}}>{Likes}</span>
                </span>&nbsp;&nbsp;
                <span key="comment-basic-dislike">
                    <span key="comment-basic-like">
                        <Tooltip title="like">
                            <Icon type="like"
                                  theme={DislikeAction === 'liked' ? 'filled' : 'outlined'}
                                  onClick
                            />
                        </Tooltip>
                    <span style={{paddingLeft:'8px', cursor:'auto'}}>{Dislikes}</span>
                </span>&nbsp;&nbsp;
                </span>
            </React.Fragment>
        </div>
    )
}

export default LikesDislikes
