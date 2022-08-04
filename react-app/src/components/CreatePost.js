import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkCreatePost} from '../store/post';

const CreatePostForm = () => {
    const dispatch = useDispatch();
    const { userId }= useParams
    const ownerId = Number(userId)
    const [ mediaUrl, setMediaUrl ] = useState('')
    const [ caption, setCaption ] = useState('')
    const [ hasSubmitted, setHasSubmitted ] = useState(false);
    const [ validationErrors, setValidationErrors ] = useState([]);

    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        const errors = [];
        if (!mediaUrl) errors.push("You must upload a photo");
    }, [mediaUrl]);

    const dateTime = new Date();
    const isoTime = dateTime.toISOString();
    console.log("ISOTIME",isoTime)
    const date = isoTime.slice(0, 10);
    console.log("Date",date)
    const time = isoTime.slice(12, 19);
    console.log("time",time)
    const combined = date + ' ' + time

    const onSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if (validationErrors.length) alert("Cannot create post");

        const payload = {
            owner_id: sessionUser.id,
            media_url: mediaUrl,
            caption: caption,
            created_at: combined
        };

        const createdPost = await dispatch(thunkCreatePost(payload))

        if (createdPost) reset();
        setHasSubmitted(false);
        // hideForm();
    }

    const reset = () => {
        setMediaUrl("");
        setCaption("");
    };

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
            <h2>Upload a post</h2>
            <label>
                Photo
                <input type="url" value={mediaUrl} onChange={e => setMediaUrl(e.target.value)}/>
            </label>

            <label>
                caption
                <input type="text" value={caption} onChange={e => setCaption(e.target.value)}/>
            </label>
            <button type="submit">Post</button>
            </form>
        </div>
    )
};

export default CreatePostForm;
