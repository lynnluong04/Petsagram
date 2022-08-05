import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkCreateComment } from '../store/comment';

const CreateCommentForm = ({ postId }) => {
    const dispatch = useDispatch();

    const [ content, setContent ] = useState('')
    const [ hasSubmitted, setHasSubmitted ] = useState(false);
    const [ validationErrors, setValidationErrors ] = useState([]);
    const sessionUser = useSelector(state => state.session.user);


    useEffect(() => {
        const errors = [];
        if (!content) errors.push("Your comment cannot be empty");
    }, [content]);

    const dateTime = new Date();
    const isoTime = dateTime.toISOString();
    const date = isoTime.slice(0, 10);
    const time = isoTime.slice(12, 19);
    const combined = date + ' ' + time

    const onSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true)

        if (validationErrors.length) alert("Cannot create comment");

        const payload = {
            post_id: postId,
            owner_id: sessionUser.id,
            content: content,
            created_at: combined
        };

        const createdComment = await dispatch(thunkCreateComment(payload));

        if (createdComment) {
            setContent('');
        }
        setHasSubmitted(false)
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
            {hasSubmitted && validationErrors.length > 0 && (
                <ul>
                    {validationErrors.map(error => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
            )}
            <input type='text' value={content} placeholder="Write comment here"
            onChange={e => setContent(e.target.value)}/>
            <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateCommentForm;
