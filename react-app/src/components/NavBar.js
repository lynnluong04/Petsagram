import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import CreatePostModal from './CreatePostModal';
import "./css/navbar.css"
import NavDropdown from './NavDropdown';

const NavBar = () => {

  const sessionUser = useSelector(state => state.session.user);
  console.log("PHOTO URL??", sessionUser.photo_url)

  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            <img className='logo nav' src="https://www.linkpicture.com/q/Screen-Shot-2022-08-08-at-8.39.47-PM_1.png" />
          </NavLink>
        </li>

        <li className='nav-right'>
          <div className='nav icon links'>
            <NavLink to='/' exact={true} activeClassName='active'>
              <svg color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M9.005 16.545a2.997 2.997 0 012.997-2.997h0A2.997 2.997 0 0115 16.545V22h7V11.543L12 2 2 11.543V22h7.005z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>
            </NavLink>
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
