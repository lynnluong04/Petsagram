import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import CreatePostModal from './CreatePostModal';
import "./css/navbar.css"
import NavDropdown from './NavDropdown';

const IMAGE = (imgName) => {
  return require(`./images/${imgName}`).default
}

const NavBar = () => {
  const history = useHistory()
  const sessionUser = useSelector(state => state.session.user);

  const refreshHome = () => {
    history.push('/')
    // window.location.reload()
    window.scrollTo({top: 0, left: 0});
  }

  return (
    <nav>
      <ul>
        <li>
          <div className='nav-logo' onClick={refreshHome}>
          {/* <NavLink to='/' exact={true} activeClassName='active'> */}
            <img className='logo nav' src={IMAGE("logo-black.png")} />
          {/* </NavLink> */}
          </div>
        </li>

        <li className='nav-right'>
          <div className='nav icon links'>
            <div onClick={refreshHome}>
              <svg className="links" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M9.005 16.545a2.997 2.997 0 012.997-2.997h0A2.997 2.997 0 0115 16.545V22h7V11.543L12 2 2 11.543V22h7.005z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>
            </div>
            <CreatePostModal />
          </div>

          <div className='nav profile icon'>
            <NavDropdown />
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
