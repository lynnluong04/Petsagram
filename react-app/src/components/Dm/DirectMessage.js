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
    const [validationErrors, setValidationErrors] = useState([]);
    const [currentRecipient, setCurrentRecipient] = useState('')
    let recipients = []
    let joinedId;
    let roomId;
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        if (recipient) recipients.push(recipient.username)
    }, [recipient])

    useEffect(() => {
        const errors = [];
        if (chatInput.length === 0) errors.push("Message body cannot be empty.");

        setValidationErrors(errors);
    }, [chatInput]);

    useEffect(() => {
        if (recipient) {
            setCurrentRecipient(recipient)
            joinedId = [sessionUser.id, recipient.id].sort();
            roomId = `${joinedId[0]}-${joinedId[1]}`;
            socket = io();

            if (socket && recipient.id && sessionUser) socket.emit("dm_join", { username: sessionUser.username, dm_room_id: roomId })

            //listen for chat events
            socket.on('dm_chat', chat => {
                // when receive a chat, add to messages state var
                setMessages(messages => [...messages, chat]);
                // console.log('chat in socket.on(dm_chat):', chat)
            })

            //when component unmounts, disconnect
            return (() => {
                // socket.removeAllListeners()
                socket.emit('dm_leave', { username: sessionUser.username, recipient: recipient.id });
                socket.disconnect();
                setMessages([]);
            })
        }
    }, [recipient, messages])

    const sendChat = async (e) => {
        e.preventDefault();

        if (validationErrors.length === 0) {
            //emit a message
            if (recipient.id && sessionUser) socket.emit('dm_chat', { username: sessionUser.username, msg: chatInput, dm_room_id: roomId });

            const dateTime = new Date();
            const isoTime = dateTime.toISOString();
            const date = isoTime.slice(0, 10);
            const time = isoTime.slice(12, 19);
            const combined = date + ' ' + time

            // const payload = {
            //     sender_id: sessionUser.id,
            //     recipient_id: recipient.id,
            //     message_body: chatInput,
            //     created_at: combined
            // }

            // await dispatch(sendDmMessage(payload));
            setChatInput('');
        }


        //clear input field after message is sent
        setChatInput('');
    }

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
                {/* <div className='dm-history-container'>
                    {sessionUser && (
                        dmHistory && dmHistory?.map((message, idx) => (
                            <div className='single-dm' key={idx}>
                                <div className='dm-name'>

                                    {message.sender_id === sessionUser.id ?
                                        sessionUser?.username :
                                        recipient?.username}
                                </div>
                                <div className='msg-body' >
                                    {message.message_body ?
                                        message?.message_body :
                                        message?.msg}
                                </div>
                            </div>
                        ))

                    )}
                </div> */}

                <div className='chat-box-container'>
                    <form onSubmit={sendChat} id='chat-box-form'>
                        <input
                            placeholder={`Message ${recipient?.username}`}
                            value={chatInput}
                        // onChange={updateChatInput}
                        />
                        {/* <button>Send</button> */}
                    </form>
                </div>
            </div>

        </div>
    )
}

export default DirectMessaging;
