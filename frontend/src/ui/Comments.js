import React , {useState} from 'react';
import { Button, Input } from 'antd';
import axios from 'axios';
import {useSelector} from 'react-redux';
import TextArea from "antd/es/input/TextArea";
import {isValidated} from "../validators";
import {API} from "../Config";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";
import {Col, Container, Row} from "react-bootstrap";
import Layout from "./Layout";

function Comments(props) {


    //hold state
    const user = isValidated() && isValidated().user._id

    const [Comment, setComment] = useState("");

    //get value
    const handleChange = (e) => {
        setComment(e.currentTarget.value);
    }

    //on comment submit action
    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            content: Comment,
            writer: user._id,
            postId: props.postId,
        }

        axios.post(`${API}/comments/saveComment`,variables)
            .then(response => {
                if (response.data.success) {
                    setComment("")
                    console.log(response)
                    props.refreshFunction(response.data.result)
                }else {
                    alert('Failed to save comment')
                }
            })
    }

    return (
        <Container>
            <Row>
                <Col xs={12}>
                    <div>
                        <br/>
                        <p> Comments </p>
                        <hr/>


                        {props.CommentLists && props.CommentLists.map((comment, index) => (
                            (!comment.responseTo &&
                                <div key={index}>
                                    <React.Fragment>
                                        <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                                        <ReplyComment CommentLists={props.CommentLists} postId={props.postId} parentCommentId={comment._id} refreshFunction={props.refreshFunction} />
                                    </React.Fragment>
                                </div>
                            )
                        ))}


                        <form style={{display: 'flex'}} onSubmit={onSubmit}>
                            <TextArea
                                style={{width: '100%' , borderRadius: '5px',marginBottom:30}}
                                onChange={handleChange}
                                value={Comment}
                                placeholder = "write a comment"
                                />
                                <Button style={{width: '20%',height: '52px'}} onClick={onSubmit}>Submit</Button>
                        </form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Comments;
