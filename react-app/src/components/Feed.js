import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { thunkLoadPosts } from '../store/post';
import AllComments from './AllComments';
import CreateCommentForm from './CreateComment';
import "./css/home.css"

const Feed = () => {
    const dispatch = useDispatch();

    const posts = useSelector(state => state.post);

    console.log("FROM FEED COMPONENT", posts)

    const postsArray = posts ? Object.values(posts) : null;

    useEffect(() => {
        dispatch(thunkLoadPosts())
    }, [dispatch]);

    // const findUser = (id) => {

    // }


    return (
        <div>
            <h2>Most recent posts</h2>
            {postsArray && postsArray.map(post => {
                return (
                    <div>
                        <div key={post.id}>
                            <NavLink to={`/${post.owner_id}`}>

                                <div> {post.owner} </div>
                            </NavLink>
                            <img src={post.media_url} alt="photo post of" />
                            <div>{post.caption}</div>
                        </div>
                        <AllComments postId={post.id} />
                        <CreateCommentForm postId={post.id} />
                    </div>

                )
            })}
        </div>
    )
};

export default Feed;
