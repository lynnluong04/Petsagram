import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { thunkLoadPosts } from '../store/post';
import "./css/profile.css"

const Profile = () => {
    const [user, setUser] = useState({});
    const dispatch = useDispatch();
    const { userId } = useParams();
    const numberId = Number(userId)
    const posts = useSelector(state => state.post);
    const postsArray = posts ? Object.values(posts) : null;
    const location = useLocation();

    useEffect(() => {
        if (!userId) {
            return;
        }
        (async () => {
            const response = await fetch(`/api/users/${userId}`);
            const user = await response.json();
            setUser(user);
        })();
    }, [userId]);

    useEffect(() => {
        dispatch(thunkLoadPosts(Number(userId)));
    }, [dispatch]);



    return (
        <div className='profile container'>
            <div className='profile top'>
                <img className="profile-image" src={user?.photo_url} />
                <div>{user?.username}</div>
            </div>
            <div className='profile-bottom' >
                <div>
                    <svg aria-label="" class="_ab6-" color="#262626" fill="#262626" height="12" role="img" viewBox="0 0 24 24" width="12"><rect fill="none" height="18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" width="18" x="3" y="3"></rect><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="9.015" x2="9.015" y1="3" y2="21"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="14.985" x2="14.985" y1="3" y2="21"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="9.015" y2="9.015"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="21" x2="3" y1="14.985" y2="14.985"></line></svg>
                    <span>POSTS</span>
                </div>
                <div className='photos-container'>

                    {postsArray && postsArray.map(post => {
                        return (
                            <NavLink to={{
                                pathname: `/${numberId}/${post.id}`,
                                state: { background: location }
                            }}
                                key={post.id}>
                                <img className='profile-post' src={post.media_url} alt="post of" />
                            </NavLink>
                        )
                    })}
                </div>

            </div>

        </div>
    )
};

export default Profile;
