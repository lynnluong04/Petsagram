import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import DeletePostModal from './DeletePostModal'
import { Modal } from "../context/Modal";
import EditPostForm from "./EditPost";

const EditPostModal = ({ postId, closeSinglePost }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [showModal, setShowModal] = useState(false);



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
                        <div className="edit-post-option">Edit</div>
                        <div className="cancel-edit-post">Cancel</div>
                    </div>
                    {/* <EditPostForm hideForm={() => setShowModal(false)} postId={postId} closeSinglePost={closeSinglePost}/> */}
                </Modal>
            )}
        </div>
    )
};

export default EditPostModal
