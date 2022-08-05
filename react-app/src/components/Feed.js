import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { thunkLoadPosts } from '../store/post';

const Feed = () => {
    const dispatch = useDispatch();

    const posts = useSelector(state => state.post);
    const postsArray = posts ? Object.values(posts) : null;

    useEffect(() => {
        dispatch(thunkLoadPosts())
    }, [dispatch]);


    return (
        <div>
            <h2>Most recent posts</h2>
            {postsArray && postsArray.map(post => {
                return (
                    <div key={post.id}>
                        <NavLink to={`/${post.owner_id}`}>
                            <div> {post.owner_id} </div>
                        </NavLink>
                        <img src={post.media_url} alt="photo post of"/>
                        <div>{post.caption}</div>
                    </div>
                )
            })}
        </div>
    )
};

export default Feed;
