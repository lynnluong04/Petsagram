import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { thunkLoadPosts } from '../store/post';
import AllComments from './AllComments';
import CreateCommentForm from './CreateComment';
import "./css/feed.css"

const Feed = () => {
    const dispatch = useDispatch();

    const posts = useSelector(state => state.post);

    console.log("FROM FEED COMPONENT", posts)

    const postsArray = posts ? Object.values(posts) : null;

    useEffect(() => {
        dispatch(thunkLoadPosts())
    }, [dispatch]);




    return (
        <div className='scrollable feed container'>
            {postsArray && postsArray.map(post => {
                return (
                    <div className='single-post container' key={post.id}>
                        <div className='post-top'>
                            <div className='user-links'>
                                <NavLink to={`/${post.owner_id}`} activeClassName="active">
                                    <img className='feed-profile icon' src={post.profile} />
                                </NavLink>
                                <NavLink to={`/${post.owner_id}`} activeClassName="active">
                                    <div className='post username'> {post.owner} </div>
                                </NavLink>
                            </div>
                            <div className='post-menu'>
                                <svg aria-label="More options" class="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
                            </div>
                        </div>
                        <img className='post' src={post.media_url} alt="photo post" />

                        <div className='post-bottom'>
                            <NavLink to={`/${post.owner_id}`} activeClassName="active">
                                <div className='post username'> {post.owner} </div>
                            </NavLink>
                            <div>{post.caption}</div>
                            <AllComments postId={post.id} />
                            <CreateCommentForm postId={post.id} />
                        </div>
                    </div>

                )
            })}
        </div>
    )
};

export default Feed;
