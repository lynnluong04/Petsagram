import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoginForm from './auth/LoginForm';
import SignUpForm from './auth/SignUpForm';
import Feed from './Feed';
import "./css/home.css"

const Home = () => {
    const sessionUser = useSelector(state => state.session.user);
    const [loggingIn, setLoggingIn] = useState('true')

    let content;
    if (sessionUser) {
        content = (
            <Feed />
        )
    } else if (loggingIn) {
        content = (
            <div className='home inner container'>
                <img className='home' src="https://www.linkpicture.com/q/Screen-Shot-2022-08-08-at-7.09.29-PM.png" alt="gif" />
                <LoginForm setLoggingIn={setLoggingIn} />
            </div>
        )
    } else {
        content = (
            <div className='home inner container'>
                <img className='home' src="https://www.linkpicture.com/q/Screen-Shot-2022-08-08-at-7.09.29-PM.png" alt="gif" />
                <SignUpForm setLoggingIn={setLoggingIn} />
            </div>
        )
    }

    return (
        <div className='home outer container'>
            {content}
        </div>
    )
}

export default Home;
