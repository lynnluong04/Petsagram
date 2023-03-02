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
    let recipients = []
    const sessionUser = useSelector(state => state.session.user);


    useEffect(() => {
        recipients.push(recipient.username)
    }, [recipient])

    console.log("!!!REC", recipients)
    return (
        <div className='dm-container'>
            <div className='dm-container-left'>
                <div className='dm-left-top'>
                    <div className='dm-sender'>{sessionUser.username}</div>
                    <SearchDmModal setRecipient={setRecipient} />
                </div>
                {recipient && (
                    <div>{recipient.username}</div>
                )}
            </div>

            <div className='dm-container-right'>

            </div>

        </div>
    )
}

export default DirectMessaging;
