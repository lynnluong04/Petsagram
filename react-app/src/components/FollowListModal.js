import { useState } from "react";
import "./css/likesModal.css"
import { Modal } from "../context/Modal";
import { NavLink } from "react-router-dom";
import FollowUnfollow from "./FollowUnfollow";

const FollowListModal = ({usersList, isFollowers}) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            <button onClick={() => setShowModal(true)}>
                {(isFollowers) ?
                (usersList?.length === 1 ? `${usersList?.length} follower` : `${usersList?.length} followers`)  :
                (`${usersList?.length} following`)
            }
            </button>
        </div>
    )

}

export default FollowListModal;
