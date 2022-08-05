import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkLoadComments } from '../store/comment';

const AllComments = ({ postId }) => {
    const dispatch = useDispatch();
    const comments = useSelector(state => state.comment);
    const commentsArr = comments ? Object.values(comments) : "";
    const filteredComments = commentsArr && commentsArr.filter(comment => (comment.post_id === postId))
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

    return (
        <div>
            <h3>Comments</h3>
            {filteredComments.length > 0 && filteredComments.map(comment => {
                return (
                    <div key={comment.id}>
                        <div>{comment.content} hi</div>
                    </div>
                )
            })}
        </div>
    )

}

export default AllComments;
