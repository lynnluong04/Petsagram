import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { Modal } from "../context/Modal";
import EditPostForm from "./EditPost";

const EditPostModal = ({postId, closeSinglePost}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [ showModal, setShowModal ] = useState(false);



    return (
        <div>
            <div>
                <button className="edit-post-modal" onClick={() => setShowModal(true)}>Edit Post</button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditPostForm hideForm={() => setShowModal(false)} postId={postId} closeSinglePost={closeSinglePost}/>
                </Modal>
            )}
        </div>
    )
};

export default EditPostModal
