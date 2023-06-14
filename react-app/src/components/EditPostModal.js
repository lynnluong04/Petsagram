import { useState } from "react";
import DeletePostModal from './DeletePostModal'
import { Modal } from "../context/Modal";
import EditPostForm from "./EditPost";

const EditPostModal = ({ postId, closeSinglePost }) => {

    const [showModal, setShowModal] = useState(false);
    const [showEditPost, setShowEditPost] = useState(false);



    return (
        <div>
            <div>
                <button className="edit-post-modal" onClick={() => setShowModal(true)}>
                    <svg aria-label="More options" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
                </button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className="edit-post-options">
                        < DeletePostModal postId={postId} hideForm={() => setShowModal(false)} closeSinglePost={closeSinglePost} />
                        <div onClick={() => setShowEditPost(true)} className="edit-post-option">Edit</div>
                        <div onClick={() => setShowModal(false)} className="cancel-edit-post">Cancel</div>
                    </div>
                </Modal>
            )}

            {showEditPost && (
                <Modal onClose={() => setShowEditPost(false)}>
                    <EditPostForm hideForm={() => setShowModal(false)} postId={postId} closeEdit={()=>setShowEditPost(false) } />
                </Modal>)}
        </div>
    )
};

export default EditPostModal
