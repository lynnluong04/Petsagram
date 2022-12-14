import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkCreatePost } from '../store/post';
import "./css/upload.css"
import { Modal } from "../context/Modal";

const CreatePostForm = ({ hideForm }) => {
    // const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const { userId } = useParams();
    // const ownerId = Number(userId);
    const [image, setImage] = useState(null)
    // const [imageLoading, setImageLoading] = useState(false);
    const [caption, setCaption] = useState('');
    // const [hasSubmitted, setHasSubmitted] = useState(false);
    const [brokenImage, setBrokenImage] = useState(false)

    const [preview, setPreview] = useState('')
    const [exitPreview, setExitPreview] = useState(true);


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



    const onSubmit = async (e) => {
        e.preventDefault();
        // setHasSubmitted(true);

        const formData = new FormData();
        formData.append("image", image)
        formData.append("caption", caption)

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        // setImageLoading(true);

        // if (validationErrors.length) alert("Cannot create post");

        const createdPost = await dispatch(thunkCreatePost(formData))

        if (createdPost) reset();
        // setHasSubmitted(false);
        // setImageLoading(false);
        hideForm();
        window.scrollTo({top: 0, left: 0});
    }
    const reset = () => {
        setImage("");
        setCaption("");
    };

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

let brokenImageError;
if (brokenImage) {
    brokenImageError = (
        <Modal onClose={() => setBrokenImage(false)}>
            <div className='image-error' >You tried uploading an invalid photo. Please try again. </div>
        </Modal>
    )
}

    const clearPreview = () => {
        setExitPreview(true)
        setPreview(undefined)
        setImage(null)
    }

    return (
        <div className='create-post container'>
            <form className='post' onSubmit={onSubmit}>

                {exitPreview && !preview && (
                    <div className='conditional container one' >
                        <div className='create-post top first'>
                            <div>Create a new post</div>
                        </div>
                        <div className='create-post bottom'>
                            <svg className='upload' aria-label="Icon to represent media such as images or videos" color="#262626" fill="#262626" height="77" role="img" viewBox="0 0 97.6 77.3" width="96"><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path></svg>
                            <div className='upload-text' >Upload photos here</div>
                            <label className='upload'>
                                Select from computer
                                <input className='upload' type="file" accept="image/*" onChange={updateImage} />
                            </label>
                        </div>
                    </div>
                )}


                {preview && (
                    <div className='conditional container two'>
                        <div className="create-post top next">
                            <div onClick={() => clearPreview()}>
                                <svg className='arrow' aria-label="Back" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="2.909" x2="22.001" y1="12.004" y2="12.004"></line><polyline fill="none" points="9.276 4.726 2.001 12.004 9.276 19.274" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polyline></svg>
                            </div>
                            <div className='create-post top'>Create a new post</div>
                            <button className='share' type="submit">Share</button>
                        </div>

                        <div className='create-post bottom next'>
                            <img className='preview' src={preview} onError={(e)=>{e.target.onerror = null; setPreview(false); setBrokenImage(true)}} alt="post preview" />

                            <div className='caption container'>
                                <div className='create-post user'>
                                    <img className='user' src={sessionUser?.photo_url ? sessionUser?.photo_url : "https://cdn140.picsart.com/297361716279211.png?to=crop&type=webp&r=1456x1388&q=85"} alt="user pic"/>
                                    <div> {sessionUser.username} </div>
                                </div>

                                <textarea className='caption' maxLength="2200" type="text" placeholder='Write a caption...' value={caption} onChange={e => setCaption(e.target.value)}> </textarea>
                            </div>

                        </div>
                    </div>
                )}

                {brokenImage && brokenImageError}

                {/* {(imageLoading) && <p>Loading...</p>} */}
            </form>
        </div>
    )
};

export default CreatePostForm;
