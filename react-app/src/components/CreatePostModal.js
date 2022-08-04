import { useState } from "react";

import { Modal } from "../context/Modal";
import CreatePostForm from "./CreatePost";

const CreatePostModal = () => {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <div>
            <div>
                <button onClick={() => setShowModal(true)}>Create Post</button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreatePostForm hideForm={() => setShowModal(false)}/>
                </Modal>
            )}
        </div>
    )
};

export default CreatePostModal
