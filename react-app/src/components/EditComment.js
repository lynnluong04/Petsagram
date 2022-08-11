import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkDeleteComment, thunkEditComment } from "../store/comment";

const EditCommentForm = ({commentId}) => {
    const dispatch = useDispatch();
    const comment = useSelector(state => state.comment[commentId])
    const [editContent, setEditContent]  = useState(comment?.content)
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const deleteComment = async (id) => {
        await dispatch(thunkDeleteComment(id));
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        const payload = {
            id: comment.id,
            content: editContent
        };

        const editedComment = await dispatch(thunkEditComment(payload));

        if (editedComment) {
            setEditContent('')
            setHasSubmitted(false)
        };

    }

    return (
        <div className="edit-form container">
            <div>Edit your comment</div>
            <form className="edit-comment" onSubmit={onSubmit}>
                <input type="text"
                value={editContent}
                onChange={e => setEditContent(e.target.value)}>
                </input>
                <button className="submit-edit-comment">Submit</button>
            </form>
            <button className="delete-comment" onClick={() => deleteComment(comment.id)}>Delete</button>

        </div>
    )
}

export default EditCommentForm;
