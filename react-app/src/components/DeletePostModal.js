import { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkDeletePost } from "../store/post";
import { Modal } from "../context/Modal";
import { useHistory } from "react-router-dom";

const DeletePostModal = ({postId, hideForm, closeSinglePost}) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const deletePost = async (id) => {
        await dispatch(thunkDeletePost(id));
        hideForm()
        closeSinglePost();
        history.goBack();
    }

    const switchModal = ()=>{
        setShowDeleteModal(true)
    }

    return (

        <div >
             <button onClick={()=>switchModal()} className="delete-post-option">Delete</button>

             {showDeleteModal && (
                <Modal onClose={()=> setShowDeleteModal(false)} >
                    <div className="delete-post-container">
                        <div className="upper-delete">
                            <span className="delete-title">Delete post?</span>
                            Are you sure you want to delete this post?
                        </div>
                        <button className="delete-post-option" onClick={() => deletePost(postId)}>Delete Post</button>
                        <div className="cancel-edit-post" onClick={()=> setShowDeleteModal(false)}>Cancel</div>
                    </div>
                </Modal>
             )}
        </div>
    )
}

export default DeletePostModal;
