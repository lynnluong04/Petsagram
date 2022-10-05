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

const NavBar = ({ loadHome, loadProfile, loadChat, setLoadProfile, setLoadHome }) => {
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

        {/* <li>
          <SearchBar />
        </li> */}

        <li className='nav-right'>
          <div className='nav icon links'>
            <div onClick={refreshHome}>
              {loadHome ?
                <svg className="links" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M22 23h-6.001a1 1 0 01-1-1v-5.455a2.997 2.997 0 10-5.993 0V22a1 1 0 01-1 1H2a1 1 0 01-1-1V11.543a1.002 1.002 0 01.31-.724l10-9.543a1.001 1.001 0 011.38 0l10 9.543a1.002 1.002 0 01.31.724V22a1 1 0 01-1 1z"></path></svg>
                :
                <svg className="links" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M9.005 16.545a2.997 2.997 0 012.997-2.997h0A2.997 2.997 0 0115 16.545V22h7V11.543L12 2 2 11.543V22h7.005z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>
              }
            </div>

              <div>
                { loadChat?
                  <svg aria-label="Messenger" class="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M12.003 1.131a10.487 10.487 0 00-10.87 10.57 10.194 10.194 0 003.412 7.771l.054 1.78a1.67 1.67 0 002.342 1.476l1.935-.872a11.767 11.767 0 003.127.416 10.488 10.488 0 0010.87-10.57 10.487 10.487 0 00-10.87-10.57zm5.786 9.001l-2.566 3.983a1.577 1.577 0 01-2.278.42l-2.452-1.84a.63.63 0 00-.759.002l-2.556 2.049a.659.659 0 01-.96-.874L8.783 9.89a1.576 1.576 0 012.277-.42l2.453 1.84a.63.63 0 00.758-.003l2.556-2.05a.659.659 0 01.961.874z"></path></svg>
                  :
                  <svg aria-label="Messenger" class="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M12.003 2.001a9.705 9.705 0 110 19.4 10.876 10.876 0 01-2.895-.384.798.798 0 00-.533.04l-1.984.876a.801.801 0 01-1.123-.708l-.054-1.78a.806.806 0 00-.27-.569 9.49 9.49 0 01-3.14-7.175 9.65 9.65 0 0110-9.7z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.739"></path><path d="M17.79 10.132a.659.659 0 00-.962-.873l-2.556 2.05a.63.63 0 01-.758.002L11.06 9.47a1.576 1.576 0 00-2.277.42l-2.567 3.98a.659.659 0 00.961.875l2.556-2.049a.63.63 0 01.759-.002l2.452 1.84a1.576 1.576 0 002.278-.42z" fillRule="evenodd"></path></svg>
                }
              </div>
            <CreatePostModal />
          </div>

          <div className='nav profile icon'>
            <NavDropdown loadHome={loadHome} loadProfile={loadProfile} setLoadProfile={setLoadProfile} setLoadHome={setLoadHome}/>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
