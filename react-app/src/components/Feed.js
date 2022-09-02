import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { thunkLoadComments } from '../store/comment';
import { thunkLoadPosts } from '../store/post';
import AllComments from './AllComments';
import CreateCommentForm from './CreateComment';
import "./css/feed.css"
import LikeUnlike from './LikeUnlike';

const Feed = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const posts = useSelector(state => state.post);
    const comments = useSelector(state => state.comment)
    const [openComments, setOpenComments] = useState(false);
    const [expandCaption, setExpandCaption] = useState(false);

    const postsArray = posts ? Object.values(posts) : null;
    postsArray?.sort((a, b) => {
        return b.id - a.id
    });


    useEffect(() => {
        dispatch(thunkLoadPosts())
        setExpandCaption(false)
    }, [dispatch, comments]);




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
                            {/* <div className='post-menu'>
                                <svg aria-label="More options"  color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
                            </div> */}
                        </div>

                        <img className='post' src={post.media_url} alt="photo post" />

                        <div className='post-bottom'>

                            < LikeUnlike post={post}/>

                            <div className='caption-container'>
                                <NavLink to={`/${post.owner_id}`} activeClassName="active">
                                    <div className='post username'> {post.owner} </div>
                                </NavLink>
                                <div className={expandCaption ? 'caption-full' : 'caption-truncated'} >{post.caption}</div>
                                {post.caption.length > 50 &&
                                    <div
                                        onClick={() => setExpandCaption(true)} className={expandCaption ? 'hide-more' : 'show-more'}
                                    > more </div>
                                }
                            </div>
                            {post.comments_num > 0 &&
                                <NavLink to={{
                                    pathname: `/${post.owner_id}/${post.id}`,
                                    state: { background: location }
                                }} activeClassName="active">
                                    <div className='view-comments' onClick={() => setOpenComments(true)}>
                                        View all {post.comments_num} comments
                                    </div>
                                </NavLink>}
                            <CreateCommentForm postId={post.id} />
                        </div>
                    </div>


                )
            })}
        </div>
    )
};

export default Feed;
