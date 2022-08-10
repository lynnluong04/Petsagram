import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { thunkCreatePost } from '../store/post';
import "./css/upload.css"

const CreatePostForm = ({ hideForm }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { userId } = useParams();
    const ownerId = Number(userId);
    const [image, setImage] = useState(null)
    const [imageLoading, setImageLoading] = useState(false);
    const [caption, setCaption] = useState('');
    const [hasSubmitted, setHasSubmitted] = useState(false);
    // const [ validationErrors, setValidationErrors ] = useState([]);

    const [preview, setPreview] = useState('')
    const [exitPreview, setExitPreview] = useState(true);
    const [imageCropped, setImageCropped] = useState(false);

    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {

        if (!image) {
            setPreview(undefined)
            return
        }
        const objectUrl = URL.createObjectURL(image)
        setPreview(objectUrl)
        return () => URL.revokeObjectURL(objectUrl)
    }, [image])

    console.log("WHAT IS THE IMAGE", preview)

    // useEffect(() => {
    //     const errors = [];
    //     if (!image) errors.push("You must upload a photo");
    // }, [image]);


    const onSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        const formData = new FormData();
        formData.append("image", image)
        formData.append("caption", caption)

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);

        // if (validationErrors.length) alert("Cannot create post");

        const createdPost = await dispatch(thunkCreatePost(formData))

        if (createdPost) reset();
        setHasSubmitted(false);
        setImageLoading(false);
        hideForm();
    }
    const reset = () => {
        setImage("");
        setCaption("");
    };

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    // let content;
    // if (imageCropped) {
    //     content = (

    //     )
    // }

    const clearPreview = () => {
        setExitPreview(true)
        setPreview(undefined)
        setImage(null)
    }

    return (
        <div>
            <form className='post' onSubmit={onSubmit}>
                {/* {hasSubmitted && validationErrors.length > 0 && (
                <ul>
                    {validationErrors.map(error => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
            )} */}
                {exitPreview && !preview && (
                    <div>
                        <div>
                            <div>Create a new post</div>
                        </div>
                        <svg aria-label="Icon to represent media such as images or videos" color="#262626" fill="#262626" height="77" role="img" viewBox="0 0 97.6 77.3" width="96"><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path></svg>
                        <label>
                            Select from computer
                            <input type="file" accept="image/*" onChange={updateImage} />
                        </label>
                    </div>
                )}


                {preview && (
                    <div>
                        <div onClick={() => clearPreview()}>
                            <svg aria-label="Back" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="2.909" x2="22.001" y1="12.004" y2="12.004"></line><polyline fill="none" points="9.276 4.726 2.001 12.004 9.276 19.274" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polyline></svg>
                        </div>
                        <img className='preview' src={preview} />
                    </div>
                )}


                <label>
                    caption
                    <input type="text" value={caption} onChange={e => setCaption(e.target.value)} />
                </label>
                <button type="submit">Post</button>
                {(imageLoading) && <p>Loading...</p>}
            </form>
        </div>
    )
};

export default CreatePostForm;
