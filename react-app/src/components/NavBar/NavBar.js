import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import LogoutButton from './auth/LogoutButton';
import CreatePostModal from '../Posts/CreatePostModal';
import "../css/navbar.css"


const IMAGE = (imgName) => {
  return require(`../images/${imgName}`).default
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

  const goToProfile = () => {
    history.push(`/${sessionUser.id}`)
  }

  const goToDm = () => {
    history.push('/direct')
  }


  return (
    <nav>
      <ul className='navbar'>
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
            <div className='menu-text'>Home</div>
          </div>

          {/* <div className='menu-item'>
          <svg aria-label="Search" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="16.511" x2="22" y1="16.511" y2="22"></line></svg>
            <SearchBar />
            <div className='menu-text'>Search</div>
          </div> */}

          {/* <NavLink to={'/about'} className={loadAbout ? 'load-info-icon menu-item' : 'info-icon menu-item'}>
              <i class="fa-solid fa-info"></i>
            <div className='menu-text'>About</div>
            </NavLink> */}

          <div className='dm menu-item' onClick={goToDm}>
            <svg aria-label="Messenger" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M12.003 2.001a9.705 9.705 0 1 1 0 19.4 10.876 10.876 0 0 1-2.895-.384.798.798 0 0 0-.533.04l-1.984.876a.801.801 0 0 1-1.123-.708l-.054-1.78a.806.806 0 0 0-.27-.569 9.49 9.49 0 0 1-3.14-7.175 9.65 9.65 0 0 1 10-9.7Z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.739"></path><path d="M17.79 10.132a.659.659 0 0 0-.962-.873l-2.556 2.05a.63.63 0 0 1-.758.002L11.06 9.47a1.576 1.576 0 0 0-2.277.42l-2.567 3.98a.659.659 0 0 0 .961.875l2.556-2.049a.63.63 0 0 1 .759-.002l2.452 1.84a1.576 1.576 0 0 0 2.278-.42Z" fill-rule="evenodd"></path></svg>
            <div className='menu-text'> Messages </div>
          </div>

          <div className='create menu-item'>
            <CreatePostModal />
          </div>

          <div className='menu-item profile' onClick={goToProfile}>
            <div className='nav profile icon'>
              {/* <NavDropdown loadHome={loadHome} loadProfile={loadProfile} setLoadProfile={setLoadProfile} setLoadHome={setLoadHome} /> */}
              <img className='nav profile icon' src={sessionUser?.photo_url ? sessionUser?.photo_url : "https://cdn140.picsart.com/297361716279211.png?to=crop&type=webp&r=1456x1388&q=85"} alt="profile icon" />
            </div>

            <div className='menu-text'>Profile</div>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
