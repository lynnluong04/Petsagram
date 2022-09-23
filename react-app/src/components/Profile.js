import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { thunkLoadPosts } from '../store/post';
import "./css/profile.css"

const Profile = ({ loadingProfile }) => {
    const [user, setUser] = useState({});
    const dispatch = useDispatch();
    const { userId } = useParams();
    const numberId = Number(userId)
    const posts = useSelector(state => state.post);
    const postsArray = posts ? Object.values(posts) : null;
    const userPosts = postsArray ? postsArray.filter(post => (post.owner_id === numberId)) : null;
    const sessionUser = useSelector(state => state.session.user);

    const postNum = userPosts.length

    userPosts?.sort((a, b) => {
        return b.id - a.id;
    });
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
        loadingProfile();
        dispatch(thunkLoadPosts());
    }, [dispatch]);




    return (
        <div className='profile container'>
            <div className='profile top'>
                <img className="profile-image" src={user?.photo_url ? user.photo_url : "https://cdn140.picsart.com/297361716279211.png?to=crop&type=webp&r=1456x1388&q=85"} />

                <div className='user-info-top'>
                    <div className='username-edit-button'>
                        <div className='top-username'>{user?.username}</div>
                        {sessionUser.id === numberId &&
                            <NavLink
                                to={`/${sessionUser.id}/edit`}
                                className="edit-profile"
                            >Edit Profile</NavLink>
                        }
                    </div>
                    {postNum === 1 && (<div className='counts'><span className='num'>{postNum}</span> post</div>)}
                    {postNum > 1 && (<div className='counts'> <span className='num'>{postNum}</span> posts </div>)}
                    <div>{user?.bio}</div>
                </div>
            </div>

            <div className='profile-bottom' >
                <div className='categories'>
                    <svg aria-label="" class="_ab6-" color="#262626" fill="#262626" height="12" role="img" viewBox="0 0 24 24" width="12"><rect fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="18" x="3" y="3"></rect><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="9.015" x2="9.015" y1="3" y2="21"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="14.985" x2="14.985" y1="3" y2="21"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="9.015" y2="9.015"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="14.985" y2="14.985"></line></svg>
                    <span>POSTS</span>
                </div>
                <div className='outer-photos-container'>
                    <div className='photos-container'>

                        {userPosts && userPosts.map(post => {
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

        </div>
    )
};

export default Profile;
