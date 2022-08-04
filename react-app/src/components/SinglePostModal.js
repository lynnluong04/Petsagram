import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Modal } from "../context/Modal";
import SinglePost from "./SinglePost";
import { useHistory } from "react-router-dom";

const SinglePostModal = () => {
    const [ showModal, setShowModal ] = useState(false);
    const { postId } = useParams();
    const history = useHistory();
    const { userId } = useParams();

    useEffect(()=> {
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
                   <SinglePost postId={Number(postId)}/>
                </Modal>
            )}
        </div>
    )
};

export default SinglePostModal;
