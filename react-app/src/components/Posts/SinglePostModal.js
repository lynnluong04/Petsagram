import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import "../css/postModal.css"
import { Modal } from "../../context/Modal";
import SinglePost from "./SinglePost";
import EditPostModal from "./EditPostModal";
import CreateCommentForm from "../Comments/CreateComment";
import AllComments from "../Comments/AllComments";
import PostActions from "./PostActions";

const SinglePostModal = () => {
    const [showModal, setShowModal] = useState(false);
    const [caption, setCaption] = useState('')
    const [user, setUser] = useState({});

    const { postId } = useParams();
    const numPostId = Number(postId)
    const history = useHistory();
    const { userId } = useParams();

    const post = useSelector(state => state.post[numPostId])

    const sessionUser = useSelector(state => state.session.user);


    useEffect(() => {
        if (!userId) {
            return;
        }
        (async () => {
            const response = await fetch(`/api/users/${userId}`);
            const user = await response.json();
            setUser(user);
        })();

        // return () => {
        //     setUser({});
        // }
    }, [userId]);

    useEffect(() => {
        setShowModal(true)
    }, [])


    return (
        <div>
            {showModal && (
                <Modal onClose={() => {
                    setShowModal(false)
                    history.goBack()
                }}>
                    <div className="post-modal container">
                        <SinglePost postId={Number(postId)} hideForm={() => setShowModal(false)} setCaption={setCaption} />

                        <div className="right content" >
                            <div className="right-top">
                                <div className="user-info">
                                    <img className="post-user" src={user.photo_url ? user.photo_url : "https://cdn140.picsart.com/297361716279211.png?to=crop&type=webp&r=1456x1388&q=85"} alt="user pic"/>
                                    <div className="username" >{user.username}</div>
                                </div>

                                {post && sessionUser.id === post.owner_id && <EditPostModal postId={Number(postId)} closeSinglePost={() => setShowModal(false)} />}
                            </div>

                            <div className="caption-comments" >
                                <div className="user-info-caption">
                                    <div className="caption icon">
                                        <img className="post-user two" src={user.photo_url ? user.photo_url : "https://cdn140.picsart.com/297361716279211.png?to=crop&type=webp&r=1456x1388&q=85"}alt="user pic"/>
                                    </div>
                                    <div className="caption-content">
                                        <span className="post-username">{`${user.username} `}</span> {caption}
                                    </div>
                                </div>
                                <AllComments postId={Number(postId)} />
                            </div>
                            <div>
                                <PostActions post={post} />
                            </div>
                            <CreateCommentForm postId={Number(postId)} />

                        </div>
                    </div>
                </Modal>
            )}
        </div>
    )
};

export default SinglePostModal;
