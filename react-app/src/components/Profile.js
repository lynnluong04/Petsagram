import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { thunkLoadPosts } from '../store/post';
import "./css/profile.css"

const Profile = () => {
    const [user, setUser] = useState({});
    const dispatch = useDispatch();
    const {userId} = useParams();
    const numberId = Number(userId)
    const posts = useSelector(state => state.post);
    const postsArray = posts ? Object.values(posts) : null;

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
            {postsArray && postsArray.map(post => {
                return (
                        <NavLink to={`/${numberId}/${post.id}` } key={post.id}>
                            <img className='profile-post' src={post.media_url} alt="post of" />
                        </NavLink>
                )
            })}
            </div>

        </div>
    )
};

export default Profile;
