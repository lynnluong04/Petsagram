import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
// import LogoutButton from './auth/LogoutButton';
import CreatePostModal from './CreatePostModal';
import "./css/navbar.css"
import NavDropdown from './NavDropdown';
import SearchBar from './Search';
import SearchSidebar from './SearchSidebar';

const IMAGE = (imgName) => {
  return require(`./images/${imgName}`).default
}

const NavBar = ({ loadHome, loadProfile, loadAbout, setLoadProfile, setLoadHome }) => {
  const history = useHistory()
  const sessionUser = useSelector(state => state.session.user);
  const [miniNav, setMiniNav] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')
  const [openSearch, setOpenSearch] = useState(false)

  const refreshHome = () => {
    history.push('/')
    // window.location.reload()
    window.scrollTo({ top: 0, left: 0 });
    setLoadHome(true)
  }

  const openSearchSidebar = () => {
    setOpenSearch(!openSearch)
    setMiniNav(!miniNav)
  }

  const goToProfile = () => {
    history.push(`/${sessionUser.id}`)
  }

  console.log("OPENSEARCH", openSearch)


  return (


    <nav className={miniNav ? 'mini-navbar' : 'full-navbar'}>
      <ul className={miniNav ? 'mini-navbar' : 'full-navbar'}>

        {/* LOGO */}
        <li>
          <div className='nav-logo' onClick={refreshHome}>
            {miniNav ? <svg aria-label="Instagram" class="x1lliihq x1n2onr6" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Instagram</title><path d="M12 2.982c2.937 0 3.285.011 4.445.064a6.087 6.087 0 0 1 2.042.379 3.408 3.408 0 0 1 1.265.823 3.408 3.408 0 0 1 .823 1.265 6.087 6.087 0 0 1 .379 2.042c.053 1.16.064 1.508.064 4.445s-.011 3.285-.064 4.445a6.087 6.087 0 0 1-.379 2.042 3.643 3.643 0 0 1-2.088 2.088 6.087 6.087 0 0 1-2.042.379c-1.16.053-1.508.064-4.445.064s-3.285-.011-4.445-.064a6.087 6.087 0 0 1-2.043-.379 3.408 3.408 0 0 1-1.264-.823 3.408 3.408 0 0 1-.823-1.265 6.087 6.087 0 0 1-.379-2.042c-.053-1.16-.064-1.508-.064-4.445s.011-3.285.064-4.445a6.087 6.087 0 0 1 .379-2.042 3.408 3.408 0 0 1 .823-1.265 3.408 3.408 0 0 1 1.265-.823 6.087 6.087 0 0 1 2.042-.379c1.16-.053 1.508-.064 4.445-.064M12 1c-2.987 0-3.362.013-4.535.066a8.074 8.074 0 0 0-2.67.511 5.392 5.392 0 0 0-1.949 1.27 5.392 5.392 0 0 0-1.269 1.948 8.074 8.074 0 0 0-.51 2.67C1.012 8.638 1 9.013 1 12s.013 3.362.066 4.535a8.074 8.074 0 0 0 .511 2.67 5.392 5.392 0 0 0 1.27 1.949 5.392 5.392 0 0 0 1.948 1.269 8.074 8.074 0 0 0 2.67.51C8.638 22.988 9.013 23 12 23s3.362-.013 4.535-.066a8.074 8.074 0 0 0 2.67-.511 5.625 5.625 0 0 0 3.218-3.218 8.074 8.074 0 0 0 .51-2.67C22.988 15.362 23 14.987 23 12s-.013-3.362-.066-4.535a8.074 8.074 0 0 0-.511-2.67 5.392 5.392 0 0 0-1.27-1.949 5.392 5.392 0 0 0-1.948-1.269 8.074 8.074 0 0 0-2.67-.51C15.362 1.012 14.987 1 12 1Zm0 5.351A5.649 5.649 0 1 0 17.649 12 5.649 5.649 0 0 0 12 6.351Zm0 9.316A3.667 3.667 0 1 1 15.667 12 3.667 3.667 0 0 1 12 15.667Zm5.872-10.859a1.32 1.32 0 1 0 1.32 1.32 1.32 1.32 0 0 0-1.32-1.32Z"></path></svg> : <img className='logo nav' src={IMAGE("logo-black.png")} alt="logo" />}
          </div>
        </li>

        <li className='menu-list'>
          <div className={miniNav? 'small-menu-item':'home menu-item'} onClick={refreshHome}>
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
          <div className={miniNav? 'small-menu-item':'menu-item'} onClick={openSearchSidebar}>
            <svg aria-label="Search" class="_ab6-" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="16.511" x2="22" y1="16.511" y2="22"></line></svg>
            {!miniNav && <div className='menu-text'>Search</div>}
          </div>


          {/* <div className='menu-item'>
          <svg aria-label="Search" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="16.511" x2="22" y1="16.511" y2="22"></line></svg>
            <SearchBar />
            <div className='menu-text'>Search</div>
          </div> */}

          {/* CREATE BUTTON */}
          <div className={miniNav? 'small-menu-item':'create menu-item'}>
            <CreatePostModal miniNav={miniNav} />
          </div>


          {/* PROFILE BUTTON */}
          <div className={miniNav? 'small-menu-item':'menu-item profile'} onClick={goToProfile}>
            <div className='nav profile icon'>
              {/* <NavDropdown loadHome={loadHome} loadProfile={loadProfile} setLoadProfile={setLoadProfile} setLoadHome={setLoadHome} /> */}
              <img className='nav profile icon' src={sessionUser?.photo_url ? sessionUser?.photo_url : "https://cdn140.picsart.com/297361716279211.png?to=crop&type=webp&r=1456x1388&q=85"} alt="profile icon" />
            </div>
            {!miniNav && <div className='menu-text'>Profile</div>}
          </div>
        </li>
      </ul>


      {openSearch && <SearchSidebar />}


    </nav>
  );
}

export default NavBar;
