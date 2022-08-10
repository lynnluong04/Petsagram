import { useState } from "react";
import { useDispatch } from "react-redux";

import { Modal } from "../context/Modal";
import { thunkDeleteComment } from "../store/comment";
import EditCommentForm from "./EditComment";

const EditCommentModal = ({ commentId }) => {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    const deleteComment = async (id) => {
        await dispatch(thunkDeleteComment(id));
    }

    return (
        <div>
            <button onClick={() => setShowModal(true)}>Edit</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditCommentForm hideForm={() => setShowModal(false)} />
                    <button onClick={() => deleteComment(commentId)}>Delete</button>
                </Modal>
            )}
        </div>
    )
};

export default EditCommentModal
