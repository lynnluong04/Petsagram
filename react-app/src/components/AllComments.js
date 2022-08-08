import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkDeleteComment, thunkLoadComments } from '../store/comment';
import EditCommentForm from './EditComment';

const AllComments = ({ postId }) => {
    const dispatch = useDispatch();
    const comments = useSelector(state => state.comment);
    const commentsArr = comments ? Object.values(comments) : "";
    const filteredComments = commentsArr && commentsArr.filter(comment => (comment.post_id === postId))
    const sessionUser = useSelector(state => state.session.user);
    // const [users, setUsers] = useState([]);

    // useEffect(() => {
    //     async function fetchData() {
    //         const response = await fetch('/api/users/');
    //         const responseData = await response.json();
    //         setUsers(responseData.users);
    //     }
    //     fetchData();
    // }, []);


    // console.log("COMMENTS FROM ALL COMMENT COMPO", filteredComments)

    useEffect(() => {
        dispatch(thunkLoadComments())
    }, [dispatch]);

    const deleteComment = async (id) => {
        await dispatch(thunkDeleteComment(id));
    }

    return (
        <div>
            <h3>Comments</h3>
            {filteredComments.length > 0 && filteredComments.map(comment => {
                return (
                    <div key={comment.id}>
                        <div>{comment.content}</div>
                        {comment.owner_id === sessionUser?.id && (
                            <div>
                                <EditCommentForm commentId={comment.id} />
                                <button onClick={()=> deleteComment(comment.id)}>Delete</button>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )

}

export default AllComments;
