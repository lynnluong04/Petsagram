import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./css/postModal.css"
import { Modal } from "../context/Modal";
import SinglePost from "./SinglePost";
import { useHistory } from "react-router-dom";
import EditPostModal from "./EditPostModal";
import CreateCommentForm from "./CreateComment";
import AllComments from "./AllComments";

const SinglePostModal = () => {
    const [showModal, setShowModal] = useState(false);
    const [caption, setCaption] = useState('')
    const [user, setUser] = useState({});

    const { postId } = useParams();
    const history = useHistory();
    const { userId } = useParams();


    useEffect(() => {
        if (!userId) {
            return;
        }
        (async () => {
            const response = await fetch(`/api/users/${userId}`);
            const user = await response.json();
            setUser(user);
        })();
    }, [userId]);

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
                    <div className="post-modal container">
                        <SinglePost postId={Number(postId)} hideForm={() => setShowModal(false)} setCaption={setCaption} />

                        <div className="right content" >
                            <div className="right-top">
                                <img className="post-user" src={user.photo_url} />
                                {user.username}
                                {caption}
                                <EditPostModal postId={Number(postId)} />
                            </div>

                            <AllComments postId={Number(postId)}/>
                            <CreateCommentForm postId={Number(postId)} />
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    )
};

export default SinglePostModal;
