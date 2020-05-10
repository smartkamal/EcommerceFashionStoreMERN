import React , {useState} from 'react';
import { Button, Input } from 'antd';
import axios from 'axios';
import {useSelector} from 'react-redux';
import TextArea from "antd/es/input/TextArea";

function Comments(props) {

    const user = useSelector(state => state.user);
    const [Comment, setComment] = useState("");

    const handleChange = (e) => {
        setComment(e.currentTarget.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            content: Comment,
            writer: user.userData._id,
            postId: props.postId,
        }

        axios.post('/api/comment/saveComment',variables)
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
            Comment
        </div>
    );
}

export default Comments;
