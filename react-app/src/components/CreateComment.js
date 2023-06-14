import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkCreateComment } from '../store/comment';

const CreateCommentForm = ({ postId }) => {
    const dispatch = useDispatch();
    const [content, setContent] = useState('')
    // const [hasSubmitted, setHasSubmitted] = useState(false);
    const [errors, setErrors] = useState([]);
    const sessionUser = useSelector(state => state.session.user);



    const dateTime = new Date();
    const isoTime = dateTime.toISOString();
    const date = isoTime.slice(0, 10);
    const time = isoTime.slice(12, 19);
    const combined = date + ' ' + time

    const onSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            post_id: postId,
            owner_id: sessionUser.id,
            content: content,
            created_at: combined
        };

        const createdComment = await dispatch(thunkCreateComment(payload));

        if (createdComment) {
            setErrors(createdComment);
        } else {
            setContent('');
            setErrors([]);
        }



    }

    return (
        <div className='comments create'>
            {errors && errors.map((error, ind) => (
                <div className='comments-error' key={ind}>{error}</div>
            ))}
            <form className='comments' onSubmit={onSubmit}>
                <input value={content} maxLength='2200' placeholder="Write comment here"
                    onChange={e => setContent(e.target.value)}/>
                <button className='post-comment' type="submit">Post</button>
            </form>
        </div>
    )
}

export default CreateCommentForm;
