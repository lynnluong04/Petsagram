import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkLoadComments } from '../store/comment';

const AllComments = ({postId}) => {
    const dispatch = useDispatch();
    const comments = useSelector(state => state.comment[postId])

    console.log("COMMENTS FROM ALL COMMENT COMPO", comments)
    useEffect(() => {
        dispatch(thunkLoadComments(postId))
    }, [dispatch]);

    return (
        <div>

        </div>
    )

}

export default AllComments;
