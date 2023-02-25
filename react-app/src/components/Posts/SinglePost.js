import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { useHistory, useParams } from 'react-router-dom';
import { thunkLoadPosts } from '../../store/post';
// import "./css/profile.css"

const SinglePost = ({postId, hideForm, setCaption}) => {
    const dispatch = useDispatch();
    // const { userId } = useParams();
    // const history = useHistory();

    const post = useSelector(state => state.post[postId]);

    // useEffect(() => {
    //     dispatch(thunkLoadPosts())
    // }, [dispatch]);

    useEffect(()=> {
        if (post) setCaption(post.caption)
    }, [post])

    // const deletePost = async(id) => {
    //     await dispatch(thunkDeletePost(id));
    //     hideForm();
    //     history.push(`/${userId}`)
    // }

    if (post) {
        return (
            <div className='single post container'>
                <img className="post-photo" src={post.media_url} alt="post"/>
                {/* <div>{post.caption}</div> */}
                {/* <button onClick={() => deletePost(postId)} >Delete Post</button> */}
            </div>
        )
    } else {
        return (
            <></>
        )
    }

}

export default SinglePost;
