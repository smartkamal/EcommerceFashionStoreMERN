import React , {useState} from 'react';
import { Button, Input } from 'antd';
import axios from 'axios';
import {useSelector} from 'react-redux';
import TextArea from "antd/es/input/TextArea";
import {isValidated} from "../validators";
import {API} from "../Config";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";

function Comments(props) {

    const user = isValidated() && isValidated().user._id
    const [Comment, setComment] = useState("");

    const handleChange = (e) => {
        setComment(e.currentTarget.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            content: Comment,
            writer: user,
            postId: props.postId,
        }

        axios.post(`${API}/comments/saveComment`,variables)
            .then(response => {
                if (response.data.success) {
                    setComment("")
                    props.refreshFunction(response.data.result)
                }else {
                    alert('Failed to save comment')
                }
            })
    }

    return (
        <div>
            <br/>
            <p> Comments </p>
            <hr/>
            {console.log(props.CommentLists)}

            {props.CommentLists && props.CommentLists.map((comment, index) => (
                (!comment.responseTo &&
                    <React.Fragment>
                        <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                        <ReplyComment CommentLists={props.CommentLists} postId={props.postId} parentCommentId={comment._id} refreshFunction={props.refreshFunction} />
                    </React.Fragment>
                )
            ))}

            <form style={{display: 'flex'}} onSubmit={onSubmit}>
                <TextArea
                    style={{width: '100%' , borderRadius: '5px'}}
                    onChange={handleChange}
                    value={Comment}
                    placeholder = "write a comment"
                    />
                    <Button style={{width: '20%',height: '52px'}} onClick={onSubmit}>Submit</Button>
            </form>
        </div>
    );
}

export default Comments;
