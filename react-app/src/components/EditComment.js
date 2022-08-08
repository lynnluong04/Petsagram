import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkEditComment } from "../store/comment";

const EditCommentForm = ({commentId}) => {
    const dispatch = useDispatch();
    const comment = useSelector(state => state.comment[commentId])
    const [editContent, setEditContent]  = useState(comment?.content)
    const [hasSubmitted, setHasSubmitted] = useState(false);


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
        <div>
            <form onSubmit={onSubmit}>
                <input type="text"
                value={editContent}
                onChange={e => setEditContent(e.target.value)}>
                </input>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default EditCommentForm;
