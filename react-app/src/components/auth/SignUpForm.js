import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';
import * as sessionActions from "../../store/session";
import "../css/home.css"

const IMAGE = (imgName) => {
  return require(`../images/${imgName}`).default
}

const SignUpForm = ({ setLoggingIn }) => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSignUp = async (e) => {
    e.preventDefault();
    // if (password === confirm) {
    const data = await dispatch(signUp(username, name, email, password, confirm));
    if (data) {
      setErrors(data)
      // }
    }

    // if (password !== confirm) {
    //   errors.push("Passwords do no match")
    // }

  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };
  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateConfirm = (e) => {
    setConfirm(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  };

  const handleDemoUser = async (e) => {
    e.preventDefault();
    const email = 'demo@aa.io';
    const password = 'password';
    await dispatch(sessionActions.login(email, password));
    history.push('/')
  };

  return (
    <div className='signup form container'>
      <div className='signup upper container'>
        <img className='logo signup' src={IMAGE("logo-black.png")} alt="signup logo"/>
        <div className='signup text'>Sign up to see photos and videos from your pet friends.</div>
        <button className='signup demo' onClick={handleDemoUser}>Log in with Demo User</button>
        <img className='or signup' src={IMAGE("splash-or.png")} alt="iphone" />

        <form onSubmit={onSignUp}>
          <input
            type='text' placeholder='Email'
            className='home signup' name='email'
            onChange={updateEmail} value={email}>
          </input>
          <input
            type='text' placeholder='Full Name'
            className='home signup' name='name'
            onChange={updateName} value={name}>
          </input>
          <input
            className='home signup' placeholder='Username'
            type='text' name='username'
            onChange={updateUsername} value={username}>
          </input>
          <input
            type='password' placeholder='Password'
            className='home signup' name='password'
            onChange={updatePassword} value={password}>
          </input>
          <input
            type='password' className='home signup'
            name='confirm' placeholder='Confirm Password'
            onChange={updateConfirm} value={confirm}
          >
          </input>
          <div className='req-text'>All fields required*</div>
          <button className='submit signup' type='submit'>Sign Up</button>
        </form>
        <div className='signup error-container'>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
      </div>

      <div className='signup lower container'>Have an account?
        <div className='login link' onClick={() => setLoggingIn(true)}>Log in</div>
      </div>

      <div className='about-container'>
        Connect with Developer
        <div className='link container'>
          <a href="https://github.com/lynnluong04/" target='_blank' rel="noreferrer">
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

export default SignUpForm;
