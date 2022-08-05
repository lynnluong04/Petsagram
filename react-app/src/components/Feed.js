import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkLoadPosts } from '../store/post';
import AllComments from './AllComments';

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
                    <div>
                        <div key={post.id}>
                            <div> {post.owner_id} </div>
                            <img src={post.media_url} alt="photo post of" />
                            <div>{post.caption}</div>
                        </div>
                        < AllComments postId={post.id} />
                    </div>

                )
            })}
        </div>
    )
};

export default Feed;
