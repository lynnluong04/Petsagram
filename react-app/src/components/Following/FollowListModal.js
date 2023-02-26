import { useState } from "react";
import "../css/likesModal.css"
// import { Modal } from "../context/Modal";
// import { NavLink } from "react-router-dom";
// import FollowUnfollow from "./FollowUnfollow";

const FollowListModal = ({ usersList, isFollowers }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            {isFollowers ?
                (usersList?.length === 1 ? <button className="counts" onClick={()=> setShowModal(true)} ><span className='num' >{usersList?.length}</span>  follower</button> :
                    <button className="counts" onClick={()=> setShowModal(true)} ><span className='num'>{usersList?.length}</span> followers</button>
                ) :
                <button className="counts" onClick={()=> setShowModal(true)} ><span className='num'>{usersList.length}</span> following</button>
            }
        </div>
    )

}



export default FollowListModal;
