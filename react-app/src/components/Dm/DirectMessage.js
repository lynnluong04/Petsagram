import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import SearchDmModal from './SearchModal';

let socket;

const DirectMessaging = () => {
    const dispatch = useDispatch();
    const [messages, setMessages] = useState([]);
    const [chatInput, setChatInput] = useState('');
    const [recipient, setRecipient] = useState([]);
    const sessionUser = useSelector(state => state.session.user);




    return (
        <div>
            <div> {sessionUser.username}</div>
            <SearchDmModal setRecipient={setRecipient} />
            {recipient && (
                <div>{recipient.username}</div>
            )}

        </div>
    )
}

export default DirectMessaging;
