import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';
import * as sessionActions from "../../store/session";
import "../css/home.css"

const SignUpForm = ({ setLoggingIn }) => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
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

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
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
        <img className='logo signup' src="https://www.linkpicture.com/q/Screen-Shot-2022-08-08-at-8.39.47-PM_1.png" />
        <div className='signup text'>Sign up to see photos and videos from your pet friends.</div>
        <button className='signup demo' onClick={handleDemoUser}>Log in with Demo User</button>
        <img className='or signup' src="https://www.linkpicture.com/q/Screen-Shot-2022-08-09-at-12.07.58-AM_1.png"/>

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
            name='repeat_password' placeholder='Confirm Password'
            onChange={updateRepeatPassword} value={repeatPassword}
            required={true}>
          </input>
          <button className='submit signup' type='submit'>Sign Up</button>
        </form>
      </div>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>

      <div className='signup lower container'>Have an account?
        <div className='login link' onClick={() => setLoggingIn(true)}>Log in</div>
      </div>

    </div>
  );
};

export default SignUpForm;
