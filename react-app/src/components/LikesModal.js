import { useState } from "react";
import "./css/likesModal.css"
import { Modal } from "../context/Modal";
import { NavLink } from "react-router-dom";

const LikesModal = ({ post }) => {
    const [showModal, setShowModal] = useState(false);
    const usersArr = post && Object.values(post.liked_users)

    return (
        <div>

            <div className="likes-amount" onClick={() => setShowModal(true)}>
                {post && post.likes_amount === 1 && `${post?.likes_amount} like`}
                {post && post.likes_amount > 1 && `${post?.likes_amount} likes`}
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className="liked-users container">
                        <div className="likes-top" >Likes</div>
                        <div className="liked-users-list">
                            {usersArr && usersArr.map(user => {
                                return (
                                    <div className="each-user" key={user.name}>
                                        <NavLink to={`/${user.id}`} activeClassName="active">
                                            <img className="liked-user" src={user.photo_url} alt="user pic"/>
                                        </NavLink>
                                        <div className="user-names">
                                            <NavLink to={`/${user.id}`} activeClassName="active" id="likes-users"> {user.username} </NavLink>
                                            <div> {user.name}</div>
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

export default LikesModal;
