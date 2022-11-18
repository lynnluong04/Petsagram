import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import LoginForm from './auth/LoginForm';
import SignUpForm from './auth/SignUpForm';
import Feed from './Feed';
import "./css/home.css"

const IMAGE = (imgName) => {
    return require(`./images/${imgName}`).default
  }

const Home = ({loadHome}) => {
    const sessionUser = useSelector(state => state.session.user);
    const [loggingIn, setLoggingIn] = useState('true')

    let content;
    if (sessionUser) {
        content = (
            <Feed loadHome={loadHome}/>
        )
    } else if (loggingIn) {
        content = (
            <div className='home inner container'>
                <img className='home' src={IMAGE("splash-phone.png")} alt="phone" />
                <LoginForm setLoggingIn={setLoggingIn} />
            </div>
        )
    } else {
        content = (
            <div className='home inner container'>
                <img className='home' src={IMAGE("splash-phone.png")} alt="gif" />
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
