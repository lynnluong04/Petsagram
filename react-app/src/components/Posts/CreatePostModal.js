import { useState } from "react";
import { useDispatch } from "react-redux";

import { Modal } from "../../context/Modal";
import CreatePostForm from "./CreatePost";

const CreatePostModal = () => {
    // const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    // const [errors, setErrors] = useState([]);

    // const buttonClick = async (e) => {
    //     e.preventDefault();
    //     setShowModal(true)
    //     const data = await dispatch(thunkCreatePost());
    //     if (data) {
    //       setErrors(data);
    //     }
    //   };

    return (
        <div>
            <div>
                <div onClick={()=> setShowModal(true)} className="create-menu">
                    <svg className="links" aria-label="New Post" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line></svg>
                    <div className='menu-text'>Create</div>
                </div>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreatePostForm hideForm={() => setShowModal(false)} />
                </Modal>
            )}
        </div>
    )
};

export default CreatePostModal
