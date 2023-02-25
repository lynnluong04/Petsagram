import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

let socket;

const DirectMessaging = () => {
    const dispatch = useDispatch();

    return (
        <div>

        </div>
    )
}

export default DirectMessaging;
