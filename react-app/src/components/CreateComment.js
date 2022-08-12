import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkCreateComment } from '../store/comment';

const CreateCommentForm = ({ postId }) => {
    const dispatch = useDispatch();

    const [content, setContent] = useState('')
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);
    const sessionUser = useSelector(state => state.session.user);


    const dateTime = new Date();
    const isoTime = dateTime.toISOString();
    const date = isoTime.slice(0, 10);
    const time = isoTime.slice(12, 19);
    const combined = date + ' ' + time

    const onSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true)

        if (validationErrors.length) alert("Cannot post empty comment");
        // if (!content) validationErrors.push("Your comment cannot be empty");

        const payload = {
            post_id: postId,
            owner_id: sessionUser.id,
            content: content,
            created_at: combined
        };

        const createdComment = await dispatch(thunkCreateComment(payload));

        if (createdComment) {
            setContent('');
            setValidationErrors(createdComment)
        }
        setHasSubmitted(false)
    }

    return (
        <div className='comments create'>
            <form className='comments' onSubmit={onSubmit}>
                {/* {hasSubmitted && validationErrors.length > 0 && (
                    <ul>
                        {validationErrors.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                )} */}
                <textarea value={content} placeholder="Write comment here"
                    onChange={e => setContent(e.target.value)}></textarea>
                <button className='post-comment' type="submit">Post</button>
            </form>
        </div>
    )
}

export default CreateCommentForm;
