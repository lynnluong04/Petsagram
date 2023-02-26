import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { thunkLoadUserPosts, thunkLoadPosts } from '../store/post';
import { thunkLoadUsers } from '../store/user';
import "./css/profile.css"
import FollowListModal from './FollowListModal';
import FollowUnfollow from './FollowUnfollow';

const Profile = ({ setLoadProfile, setLoadHome, setLoadAbout }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { userId } = useParams();

    const numberId = Number(userId);
    const user = useSelector(state => state.user[numberId]);
    const posts = useSelector(state => state.post);
    const postsArray = posts ? Object.values(posts) : null;
    // const userPosts = postsArray ? postsArray.filter(post => (post.owner_id === numberId)) : null;
    const sessionUser = useSelector(state => state.session.user);

    const postNum = postsArray.length
    const followingList = user?.following_list
    const followersList = user?.followers_list


    postsArray?.sort((a, b) => {
        return b.id - a.id;
    });

    console.log("THIS IS THE POST ARRAY", postsArray)

    useEffect(() => {
        (async() => {
            if (sessionUser.id === numberId) {
                setLoadProfile(true)
                await dispatch(thunkLoadUserPosts(sessionUser.id));
            } else {
                setLoadProfile(false)
                await dispatch(thunkLoadUserPosts(numberId));
            }
            setLoadHome(false)
            setLoadAbout(false)

            await dispatch(thunkLoadUsers());
        })();

    }, [dispatch, numberId]);



    if (user) {
        return (
            <div className='profile container'>
                <div className='profile top'>
                    <img className="profile-image" src={user?.photo_url ? user.photo_url : "https://cdn140.picsart.com/297361716279211.png?to=crop&type=webp&r=1456x1388&q=85"} alt="user pic"/>

                    <div className='user-info-top'>
                        <div className='username-edit-button'>
                            <div className='top-username'>{user?.username}</div>
                            {sessionUser.id === numberId &&
                                <NavLink
                                    to={`/${sessionUser.id}/edit`}
                                    className="edit-profile button"
                                >Edit Profile</NavLink>
                            }
                            {sessionUser.id !== numberId && (
                                <FollowUnfollow userId={userId} user={user} />
                            )}
                        </div>

                        <div className='profile-counts'>
                            {postNum === 0 && (<div className='counts'><span className='num' > 0 </span> posts</div>)}
                            {postNum === 1 && (<div className='counts'><span className='num' >{postNum}</span> post</div>)}
                            {postNum > 1 && (<div className='counts'> <span className='num' >{postNum}</span> posts</div>)}

                            <FollowListModal usersList={followersList} isFollowers={true} />
                            <FollowListModal usersList={followingList} isFollowers={false} />
                        </div>

                        <div className='profile-bio'>{user?.bio}</div>
                    </div>
                </div>

                <div className='profile-bottom' >
                    <div className='categories'>
                        <svg aria-label="" class="_ab6-" color="#262626" fill="#262626" height="12" role="img" viewBox="0 0 24 24" width="12"><rect fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="18" x="3" y="3"></rect><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="9.015" x2="9.015" y1="3" y2="21"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="14.985" x2="14.985" y1="3" y2="21"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="9.015" y2="9.015"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="14.985" y2="14.985"></line></svg>
                        <span>POSTS</span>
                    </div>
                    <div className='outer-photos-container'>
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
            </div>
        )
    } else {
        return (
            <div>Loading...</div>
        )
    }
};

export default Profile;
