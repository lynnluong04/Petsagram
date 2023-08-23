import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
// import LogoutButton from './auth/LogoutButton';
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
  const [miniNav, setMiniNav] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')

  const refreshHome = () => {
    history.push('/')
    // window.location.reload()
    window.scrollTo({ top: 0, left: 0 });
    setLoadHome(true)
  }

  const goToProfile = () => {
    history.push(`/${sessionUser.id}`)
  }


  return (
    <nav>
      <ul className='navbar'>

        {/* LOGO */}
        <li>
          <div className='nav-logo' onClick={refreshHome}>
            <img className='logo nav' src={IMAGE("logo-black.png")} alt="logo" />
          </div>
        </li>

        <li>
          <div className='menu-item' onClick={refreshHome}>
            <div >
              {loadHome ?
                <svg className="links" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M22 23h-6.001a1 1 0 01-1-1v-5.455a2.997 2.997 0 10-5.993 0V22a1 1 0 01-1 1H2a1 1 0 01-1-1V11.543a1.002 1.002 0 01.31-.724l10-9.543a1.001 1.001 0 011.38 0l10 9.543a1.002 1.002 0 01.31.724V22a1 1 0 01-1 1z"></path></svg>
                :
                <svg className="links" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M9.005 16.545a2.997 2.997 0 012.997-2.997h0A2.997 2.997 0 0115 16.545V22h7V11.543L12 2 2 11.543V22h7.005z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>
              }
            </div>
            {!miniNav && <div className='menu-text'>Home</div>}
          </div>



          {/* <NavLink to={'/about'} className={loadAbout ? 'load-info-icon menu-item' : 'info-icon menu-item'}>
              <i class="fa-solid fa-info"></i>
            <div className='menu-text'>About</div>
            </NavLink> */}

          {/* SEARCH BUTTON */}
          <div className='menu-item'>
            <svg aria-label="Search" class="_ab6-" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="16.511" x2="22" y1="16.511" y2="22"></line></svg>
            {!miniNav && <div className='menu-text'>Search</div>}
          </div>


          {/* <div className='menu-item'>
          <svg aria-label="Search" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="16.511" x2="22" y1="16.511" y2="22"></line></svg>
            <SearchBar />
            <div className='menu-text'>Search</div>
          </div> */}

          {/* CREATE BUTTON */}
          <div className='create menu-item'>
            <CreatePostModal miniNav={miniNav} />
          </div>


          {/* PROFILE BUTTON */}
          <div className='menu-item profile' onClick={goToProfile}>
            <div className='nav profile icon'>
              {/* <NavDropdown loadHome={loadHome} loadProfile={loadProfile} setLoadProfile={setLoadProfile} setLoadHome={setLoadHome} /> */}
              <img className='nav profile icon' src={sessionUser?.photo_url ? sessionUser?.photo_url : "https://cdn140.picsart.com/297361716279211.png?to=crop&type=webp&r=1456x1388&q=85"} alt="profile icon" />
            </div>
            {!miniNav && <div className='menu-text'>Profile</div>}
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
