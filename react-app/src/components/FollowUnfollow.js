import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkFollowUser, thunkUnfollowUser } from "../store/user";
import { Modal } from "../context/Modal";

const FollowUnfollow = ({ userId, user }) => {
    const dispatch = useDispatch();
    const [isFollowing, setIsFollowing] = useState(false);
    const [unfollowModal, setUnfollowModal] = useState(false);
    // const sessionUser = useSelector(state => state.session.user);


    // useEffect(()=> {
    //     if (sessionUser.following)
    // })

    const onFollow = async (e) => {
        await dispatch(thunkFollowUser(user.id))
        setIsFollowing(true)
    };

    const onUnfollow = async (e) => {
        await dispatch(thunkUnfollowUser(user.id))
        setIsFollowing(false)
        setUnfollowModal(false)
    };

    return (
        <>
            <button onClick={isFollowing ? ()=> setUnfollowModal(true) : onFollow}
            > {isFollowing ? "Following" : "Follow"} </button>

            {unfollowModal && (
                <Modal onClose={()=> setUnfollowModal(false)}>
                    <div>
                        <div>Leave @{user.username}?</div>
                        <button onClick={onUnfollow}>Unfollow</button>
                        <button onClick={()=> setUnfollowModal(false)}>Cancel</button>
                    </div>
                </Modal>
            )}
        </>
    )
}

export default FollowUnfollow;
