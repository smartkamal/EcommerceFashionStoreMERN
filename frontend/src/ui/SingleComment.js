import React, {useState}from 'react'
import {Comment, Avatar, Button, Input} from 'antd'
import {isValidated} from "../validators";
import axios from 'axios';
import {API} from "../Config";
import LikesDislikes from "./LikeDislikes";


const {TextArea} = Input;

function SingleComment(props) {
    //hold state
    const [CommentValue, setCommentValue] = useState("")
    const [OpenReply, setOpenReply] = useState(false)

    //reply comment dropdown
    const openReply = () => {
        setOpenReply(!OpenReply)
    }

    //on comment submit action
    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            writer: props.user,
            postId: props.postId,
            responseTo: props.comment._id,
            content: CommentValue
        }


        axios.post(`${API}/comments/saveComment`, variables)
            .then(response => {
                if (response.data.success) {
                    setCommentValue("")
                    setOpenReply(!OpenReply)
                    props.refreshFunction(response.data.result)
                } else {
                    alert('Failed to save Comment')
                }
            })
    }

    //get the comment value
    const handleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    const  actions = [
        <LikesDislikes comment commentId={props.comment._id} userId={localStorage.getItem('userId')}/>,
        <span onClick={openReply} key="comment-basic-reply-to">Reply to </span>
    ]

    return(
        <div>
            <Comment
    actions={actions}
    author="USER"
    avatar={
        <Avatar
            src="dw"
            alt="image"
        />
    }
    content={
        <p>
            {props.comment.content}
        </p>
    }
    />

            {OpenReply &&
            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <TextArea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleChange}
                    value={CommentValue}
                    placeholder="write some comments"
                />
                <br />
                <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
            </form>
            }
        </div>
    )
}

export default SingleComment
