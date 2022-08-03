import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkLoadPosts } from '../store/post';

const Profile = () => {
    const dispatch = useDispatch();
    const userId = useParams;
    const posts = useSelector(state => state.post);
    console.log("FROM THE FEED COMPONENT", posts);
    const postsArray = posts ? Object.values(posts) : null;

    useEffect(() => {
        dispatch(thunkLoadPosts(Number(userId)));
    }, [dispatch]);


    return (
        <div>
            <h2>Most recent posts</h2>
            {postsArray && postsArray.map(post => {
                return (
                    <div key={post.id}>
                        <div> {post.owner_id} </div>
                        <img src={post.media_url} alt="photo post of"/>
                        <div>{post.caption}</div>
                    </div>
                )
            })}
        </div>
    )
};

export default Profile;
