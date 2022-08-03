import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkLoadPosts } from '../store/post';

const CreatePost = () => {
    const dispatch = useDispatch();

    return (
        <div>
            <form>
            </form>
        </div>
    )
}
