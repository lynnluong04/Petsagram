import { useState } from "react";
import "./css/likesModal.css"
import { Modal } from "../context/Modal";
import { NavLink } from "react-router-dom";
// import FollowUnfollow from "./FollowUnfollow";

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
            {showModal && usersList.length > 0 && (
                <Modal onClose={()=> setShowModal(false)}>
                    {usersList && usersList.map(user => {
                        return (
                            <div key={user.name}>
                                        <NavLink to={`/${user.id}`} activeClassName="active">
                                            <img src={user.photo_url? user.photo_url: "https://cdn140.picsart.com/297361716279211.png?to=crop&type=webp&r=1456x1388&q=85"} alt="user pic"/>
                                        </NavLink>

                                        <div className="user-names">
                                            <NavLink to={`/${user.id}`} activeClassName="active"> {user.username} </NavLink>
                                            <div> {user.name}</div>
                                        </div>
                            </div>
                        )
                    })}

                </Modal>
            )}
        </div>


    )

}



export default FollowListModal;
