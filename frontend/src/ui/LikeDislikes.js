import React, {useEffect,useState} from 'react'
import { Tooltip } from 'antd';
import Axios from "axios";
import {API} from "../Config";
import {LikeFilled, LikeOutlined} from "@ant-design/icons";
import Icon from "@ant-design/icons/es";
import DislikeFilled from "@ant-design/icons/lib/icons/DislikeFilled";
import DislikeOutlined from "@ant-design/icons/lib/icons/DislikeOutlined";

function LikesDislikes(props) {
    //hold state
    const [Likes,setLikes] = useState(0)
    const [Dislikes,setDislikes] = useState(0)
    const [LikeAction,setLikeAction] = useState(null)
    const [DislikeAction,setDislikeAction] = useState(null)

    let variable = {
        commentId:props.commentId,
        userId:props.userId
    };

    //checking and getting comments
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
                    setDislikes(response.data.dislikes.length)

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

    //like action
    const onLike = () => {
        if (LikeAction ===null){
            Axios.post(`${API}/like/uplike`,variable)
            .then(response => {
                if (response.data.success){
                    setLikes(Likes+1)
                    setLikeAction('liked')

                    if (DislikeAction !== null) {
                        setDislikeAction(null)
                        setDislikes(Dislikes-1)
                    }
                }else{
                    alert("failed to increase the like")
                }
            })
        }else{
            Axios.post(`${API}/like/unlike`,variable)
            .then(response => {
                if (response.data.success){
                    setLikes(Likes-1)
                    setLikeAction(null)
                }else{
                    alert("failed to decrease the like")
                }
            })
        }
    }

    //dislike action
    const onDislike = () => {
        if (DislikeAction !== null){

            Axios.post(`${API}/like/undislike`,variable)
                .then(response => {
                    if(response.data.success){
                        setDislikes(Dislikes-1)
                        setDislikeAction(null)
                    }else {
                        alert('Failed to decrease dislike')
                    }
                })
        }else{
            Axios.post(`${API}/like/updislike`,variable)
                .then(response => {
                    if(response.data.success){
                        setDislikes(Dislikes+1)
                        setDislikeAction('disliked')

                        if (LikeAction !== null){
                            setLikeAction(null)
                            setLikes(Likes-1)
                        }
                    }else {
                        alert('Failed to increase dislike')
                    }
                })
        }
    }

    return(
        <div>
            <React.Fragment>
                <span key="comment-basic-like">
                    <Tooltip title="like">
                        {LikeAction === 'liked'? <LikeFilled/> : <LikeOutlined onClick={onLike}/>}
                    </Tooltip>
                    <span style={{paddingLeft:'8px', cursor:'auto'}}>{Likes}</span>
                </span>&nbsp;&nbsp;
                <span key="comment-basic-dislike">
                    <span key="comment-basic-like">
                        <Tooltip title="dislikes">
                            {DislikeAction === 'disliked'? <DislikeFilled/> : <DislikeOutlined onClick={onDislike}/>}
                        </Tooltip>
                    <span style={{paddingLeft:'8px', cursor:'auto'}}>{Dislikes}</span>
                </span>&nbsp;&nbsp;
                </span>
            </React.Fragment>
        </div>
    )
}

export default LikesDislikes
