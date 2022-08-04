import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { thunkDeletePost, thunkLoadPosts } from '../store/post';
import CreatePostForm from './CreatePost';
import CreatePostModal from './CreatePostModal';
import SinglePostModal from './SinglePostModal';
import { Modal } from '../context/Modal';
import SinglePost from './SinglePost';

const Profile = () => {
    const dispatch = useDispatch();
    const {userId} = useParams();
    const numberId = Number(userId)
    const posts = useSelector(state => state.post);
    const postsArray = posts ? Object.values(posts) : null;
    const [showModal, setShowModal] = useState(false);


    useEffect(() => {
        dispatch(thunkLoadPosts(Number(userId)));

    }, [dispatch]);

    const deletePost = async (id) => {
        await dispatch(thunkDeletePost(id));
    }

    console.log("userId FROM PROFILE??", userId)


    return (
        <div>
            <h2>Most recent posts</h2>
            {postsArray && postsArray.map(post => {
                return (
                    <div key={post.id}>
                        <div> {post.owner_id} </div>
                        <NavLink to={`/${numberId}/${post.id}`}>
                            <img src={post.media_url} alt="post of" />
                        </NavLink>
                        <div>{post.caption}</div>
                        <button onClick={() => deletePost(post.id)} >Delete Post</button>
                    </div>
                )
            })}

            <CreatePostModal />
        </div>
    )
};

export default Profile;
