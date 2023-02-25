import { useState } from "react";
import "./css/likesModal.css"
import { Modal } from "../context/Modal";
import { NavLink } from "react-router-dom";

const FollowListModal = ({ usersList, isFollowers }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            {isFollowers ?

                (usersList?.length === 1 ?
                    <button className="counts" onClick={() => setShowModal(true)} >
                        <span className='num' >{usersList?.length}</span> follower</button>
                    :
                    <button className="counts" onClick={() => setShowModal(true)} >
                        <span className='num'>{usersList?.length}</span> followers</button>
                )

                :
                <button className="counts" onClick={() => setShowModal(true)} ><span className='num'>{usersList.length}</span> following</button>
            }
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className="follow-list container">
                        {isFollowers ? (
                            <div className="follows-list top">Followers</div>
                        ) : (
                            <div className="follows-list top">Following</div>
                        )}
                        <div className="follows-list bottom">
                            {usersList && usersList.map(user => {
                                return (
                                    <div className="follows-list single-user container" key={user.name}>
                                        <NavLink to={`/${user.id}`} activeClassName="active">
                                            <img className="profile-pic" src={user.photo_url ? user.photo_url : "https://cdn140.picsart.com/297361716279211.png?to=crop&type=webp&r=1456x1388&q=85"} alt="user pic" />
                                        </NavLink>

                                        <div className="follows-list user-names">
                                            <NavLink to={`/${user.id}`} activeClassName="active" className="follows-list username"> {user.username} </NavLink>
                                            <div className="follows-list name"> {user.name}</div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </Modal>
            )}
        </div>


    )

}



export default FollowListModal;
