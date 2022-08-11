import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

import { thunkEditPost } from "../store/post";

const EditPostForm = ({ postId, hideForm }) => {
    const dispatch = useDispatch();
    const post = useSelector(state => state.post[postId])
    const [errors, setErrors] = useState([]);

    const [editCaption, setEditCaption] = useState(post?.caption);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const numberId = Number(postId)

    console.log("POSTID FROM EDIT COMPONENT", numberId)

    const onSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        const payload = {
            id: numberId,
            caption: editCaption
        };

        const editedPost = await dispatch(thunkEditPost(payload));


        if (editedPost) {
            setEditCaption('')
            setHasSubmitted(false)
            setErrors(editedPost)
        }

        hideForm();
    }

    return (
        <form className="edit-post-container" onSubmit={onSubmit}>
            <input type="text"
                value={editCaption}
                placeholder="Write a caption"
                onChange={e => setEditCaption(e.target.value)}
            ></input>
            <div className='signup error-container'>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <button type="submit" >Done</button>
        </form>
    )

}

export default EditPostForm;
