import { useState } from "react";

import { Modal } from "../context/Modal";
import EditPostForm from "./EditPost";

const EditPostModal = ({postId}) => {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <div>
            <div>
                <button className="edit-post-modal" onClick={() => setShowModal(true)}>Edit Post</button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditPostForm hideForm={() => setShowModal(false)} postId={postId}/>
                </Modal>
            )}
        </div>
    )
};

export default EditPostModal
