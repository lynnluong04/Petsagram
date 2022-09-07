import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

import { thunkDeletePost, thunkEditPost } from "../store/post";

const EditPostForm = ({ postId, hideForm, closeSinglePost }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const post = useSelector(state => state.post[postId])
    const [errors, setErrors] = useState([]);

    const [editCaption, setEditCaption] = useState(post?.caption);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const numberId = Number(postId)

    // const deletePost = async (id) => {
    //     await dispatch(thunkDeletePost(id));
    //     hideForm();
    //     closeSinglePost();
    //     history.goBack();
    // }

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
        <div>
            <form className="edit-post-container" onSubmit={onSubmit}>
                <div className="edit-post-top">
                    <button onClick={()=>hideForm()} className="cancel">Cancel</button>
                    <div className="edit-post text">Edit Post</div>
                    <button className="edit-post" type="submit" >Done</button>
                </div>

                {/* <img src={post.media_url}/> */}

                <input type="text"
                className="edit-post"
                    value={editCaption}
                    placeholder="Write a caption"
                    maxLength="2200"
                    onChange={e => setEditCaption(e.target.value)}
                ></input>
                <div className='signup error-container'>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
            </form>
            {/* <button className="delete-post" onClick={() => deletePost(numberId)}>Delete Post</button> */}
        </div>
    )

}

export default EditPostForm;
