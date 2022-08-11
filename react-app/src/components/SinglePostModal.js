import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Modal } from "../context/Modal";
import SinglePost from "./SinglePost";
import { useHistory } from "react-router-dom";
import EditPostModal from "./EditPostModal";
import CreateCommentForm from "./CreateComment";
import AllComments from "./AllComments";

const SinglePostModal = () => {
    const [showModal, setShowModal] = useState(false);
    const [caption, setCaption] = useState('')

    const { postId } = useParams();
    const history = useHistory();
    const { userId } = useParams();

    useEffect(() => {
        setShowModal(true)
    }, [])


    return (
        <div>
            {/* <div>
                <button onClick={() => setShowModal(true)}></button>
            </div> */}
            {showModal && (
                <Modal onClose={() => {
                    setShowModal(false)
                    history.push(`/${userId}`)
                }}>
                    <SinglePost postId={Number(postId)} hideForm={() => setShowModal(false)} setCaption={setCaption} />
                    <div>
                        {caption}
                        <AllComments />
                        <CreateCommentForm postId={Number(postId)} />
                        <EditPostModal postId={Number(postId)} />
                    </div>
                </Modal>
            )}
        </div>
    )
};

export default SinglePostModal;
