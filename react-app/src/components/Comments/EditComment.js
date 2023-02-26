import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkDeleteComment, thunkEditComment } from "../../store/comment";

const EditCommentForm = ({ commentId, hideForm }) => {
    const dispatch = useDispatch();
    const comment = useSelector(state => state.comment[commentId])
    const [editContent, setEditContent] = useState(comment?.content)
    const [errors, setErrors] = useState([]);

    const deleteComment = async (id) => {
        await dispatch(thunkDeleteComment(id));
    }

    const onSubmit = async (e) => {
        e.preventDefault();
    

        const payload = {
            id: comment.id,
            content: editContent
        };

        const editedComment = await dispatch(thunkEditComment(payload));

        if (editedComment) {
            setErrors(editedComment);

        } else {
            hideForm();
            setEditContent('');
            setErrors([]);
        }


    }


    return (
        <div className="edit-comment container">
            <form className="edit-comment" onSubmit={onSubmit}>
                <div className="edit-comment-top">
                    <button onClick={() => hideForm()} className="cancel">Cancel</button>
                    <div>Edit your comment</div>
                    <button className="edit-comment done">Done</button>
                </div>
                <div className='edit-comment error-container'>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <input
                    className="edit-comment"
                    type="text"
                    value={editContent}
                    maxLength="2200"
                    onChange={e => setEditContent(e.target.value)}>
                </input>
            </form>
            <button className="delete-comment" onClick={() => deleteComment(comment.id)}>Delete</button>

        </div>
    )
}

export default EditCommentForm;
