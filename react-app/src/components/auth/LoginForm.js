import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import * as sessionActions from "../../store/session";
import { login } from '../../store/session';
import "../css/home.css"

const LoginForm = ({ setLoggingIn }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  const handleDemoUser = async (e) => {
    e.preventDefault();

    const email = 'demo@aa.io';
    const password = 'password';

    await dispatch(sessionActions.login(email, password));
    history.push('/')

  }

  return (
    <div className='login form container'>
      <div className='login upper container'>
        <img className='logo login' src="https://www.linkpicture.com/q/Screen-Shot-2022-08-08-at-8.39.47-PM_1.png" />
        <form onSubmit={onLogin}>
          <input
            name='email'
            className='home one'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
          <input
            name='password'
            className='home two'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
          <button className='submit login' type='submit'>Login</button>
        </form>

        <img className='or' src="https://www.linkpicture.com/q/Screen-Shot-2022-08-09-at-12.07.58-AM_1.png"/>

        <div className='demo container'>Log in as a
          <button onClick={handleDemoUser}>Demo User</button>
        </div>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
      </div>

      <div className='login lower container'>Don't have an account?
        <div className='signup link' onClick={() => setLoggingIn(false)}>Sign up</div>
      </div>

      <div className='about-container'>
        Connect with Developer
        <div className='link container'>
          <a href="https://github.com/lynnluong04/Petsagram" target='_blank' rel="noreferrer">
            <div className='about'>
              <i className="fa-brands fa-github"></i>
              Github
            </div>
          </a>
          <a href="https://www.linkedin.com/in/lynn-luong-905740139/" target='_blank' rel="noreferrer">
            <div className='about'>
              <i className="fa-brands fa-linkedin"></i>
              LinkedIn
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
