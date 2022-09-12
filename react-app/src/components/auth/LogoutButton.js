import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import "../css/navbar.css"
import { useHistory } from 'react-router-dom';


const LogoutButton = () => {
  const dispatch = useDispatch()
  const history = useHistory();
  const onLogout = async (e) => {
    e.preventDefault()
    await dispatch(logout());
    history.push('/')
  };

  return <button className='logout-button' onClick={onLogout}><span className='logout-text'>Logout</span></button>;
};

export default LogoutButton;
