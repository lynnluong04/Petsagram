import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import CreatePostModal from './CreatePostModal';
import "./css/navbar.css"
import NavDropdown from './NavDropdown';
import SearchBar from './Search';

const IMAGE = (imgName) => {
  return require(`./images/${imgName}`).default
}

const NavBar = ({ loadHome, loadProfile, loadAbout, setLoadProfile, setLoadHome }) => {
  const history = useHistory()
  const sessionUser = useSelector(state => state.session.user);

  const refreshHome = () => {
    history.push('/')
    // window.location.reload()
    window.scrollTo({ top: 0, left: 0 });
    setLoadHome(true)
  }


  return (
    <nav>
      <ul className='navbar'>
        <li>
          <div className='nav-logo' onClick={refreshHome}>
            {/* <NavLink to='/' exact={true} activeClassName='active'> */}
            <img className='logo nav' src={IMAGE("logo-black.png")} />
            {/* </NavLink> */}
          </div>
        </li>

        <li>
          <SearchBar />
        </li>

        <li className='nav-right'>
          <NavLink to={'/about'} className={loadAbout? 'load-info-icon':'info-icon'}>
            <i class="fa-solid fa-info"></i>
            </NavLink>

          <div className='nav icon links'>
            <div onClick={refreshHome}>
              {loadHome ?
                <svg className="links" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M22 23h-6.001a1 1 0 01-1-1v-5.455a2.997 2.997 0 10-5.993 0V22a1 1 0 01-1 1H2a1 1 0 01-1-1V11.543a1.002 1.002 0 01.31-.724l10-9.543a1.001 1.001 0 011.38 0l10 9.543a1.002 1.002 0 01.31.724V22a1 1 0 01-1 1z"></path></svg>
                :
                <svg className="links" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M9.005 16.545a2.997 2.997 0 012.997-2.997h0A2.997 2.997 0 0115 16.545V22h7V11.543L12 2 2 11.543V22h7.005z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>
              }
            </div>
            <CreatePostModal />

          </div>

          <div className='nav profile icon'>
            <NavDropdown loadHome={loadHome} loadProfile={loadProfile} setLoadProfile={setLoadProfile} setLoadHome={setLoadHome} />
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
