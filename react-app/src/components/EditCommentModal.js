import { useState } from "react";

import { Modal } from "../context/Modal";
import EditCommentForm from "./EditComment";
import "./css/comment.css"

const EditCommentModal = ({ commentId }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            <button className="edit-comment" onClick={() => setShowModal(true)}>Edit</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditCommentForm hideForm={() => setShowModal(false)} commentId={commentId}  />
                </Modal>
            )}
        </div>
    )
};

export default EditCommentModal
