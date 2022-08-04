import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { thunkDeletePost, thunkLoadPosts } from '../store/post';

const SinglePost = ({postId, hideForm}) => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const history = useHistory();

    const post = useSelector(state => state.post[postId]);

    useEffect(() => {
        dispatch(thunkLoadPosts())
    }, [dispatch]);

    const deletePost = async(id) => {
        await dispatch(thunkDeletePost(id));
        hideForm();
        history.push(`/${userId}`)
    }

    if (post) {
        return (
            <div>
                <img src={post.media_url} alt="post"/>
                <div>{post.caption}</div>
                <button onClick={() => deletePost(postId)} >Delete Post</button>
            </div>
        )
    } else {
        return (
            <></>
        )
    }

}

export default SinglePost;
