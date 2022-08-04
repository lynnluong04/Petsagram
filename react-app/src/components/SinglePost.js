import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkLoadPosts } from '../store/post';

const SinglePost = ({postId}) => {
    const dispatch = useDispatch();

    const post = useSelector(state => state.post[postId]);

    useEffect(() => {
        dispatch(thunkLoadPosts())
    }, [dispatch]);

    if (post) {
        return (
            <div>
                <img src={post.media_url} alt="post"/>
                <div>{post.caption}</div>
            </div>
        )
    }

}

export default SinglePost;
