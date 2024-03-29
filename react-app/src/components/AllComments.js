import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkLoadComments } from '../store/comment';
import EditCommentModal from './EditCommentModal';

const AllComments = ({ postId }) => {
    const dispatch = useDispatch();
    const comments = useSelector(state => state.comment);
    const commentsArr = comments ? Object.values(comments) : "";
    const filteredComments = commentsArr && commentsArr.filter(comment => (comment.post_id === postId))
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        const loadComments = async () => {
          await dispatch(thunkLoadComments());
        };
        loadComments();
      }, [dispatch]);

    return (
        <div className='comments container'>
            {filteredComments.length > 0 && filteredComments.map(comment => {
                return (
                    <div className='single-comment-container' key={comment.id}>
                        <div className='single-comment'>
                            <img className='comment-user' src={comment.owner_profile} alt="user pic"/>
                            <div className='comment-owner'> {comment.owner} </div>
                            <div> {comment.content} </div>
                        </div>
                        {comment.owner_id === sessionUser?.id && (
                                <EditCommentModal commentId={comment.id} />
                        )}
                    </div>
                )
            })}
        </div>
    )

}

export default AllComments;
