import { useState } from "react";
import { useParams } from "react-router-dom";

import { Modal } from "../context/Modal";
import SinglePost from "./SinglePost";


const SinglePostModal = () => {
    const [ showModal, setShowModal ] = useState(false);
    const { postId } = useParams();


    return (
        <div>
            <div>
                <button onClick={() => setShowModal(true)}></button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                   <SinglePost postId={Number(postId)}/>
                </Modal>
            )}
        </div>
    )
};

export default SinglePostModal;
