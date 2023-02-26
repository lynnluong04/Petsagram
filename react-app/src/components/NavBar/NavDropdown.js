
import React, { useEffect, useState, } from "react";
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";


const NavDropdown = ({ setLoadProfile, loadHome, loadProfile, setLoadHome }) => {
    const [showMenu, setShowMenu] = useState(false);
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        if (!showMenu) {
            if (!loadProfile) {
                setLoadHome(true);
            }
            return;
        } else {
            setLoadHome(false);
        };

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    return (
        <div className="profile-dropdown container" >
            <button onClick={() => {
                setShowMenu(!showMenu);
            }}
                className='nav button icon'>
            {/* code for IMAGE ICON ON NAVBAR MENU */}
                <img className={showMenu || loadProfile ? 'nav-selected' : 'nav profile icon'} src={sessionUser?.photo_url ? sessionUser?.photo_url : "https://cdn140.picsart.com/297361716279211.png?to=crop&type=webp&r=1456x1388&q=85"} alt="profile icon" />
            </button>
            {showMenu && (
                <div onClick={() => setShowMenu(false)} className="dropdown container" >
                    <NavLink to={`/${sessionUser?.id}`} exact={true} activeClassName='active' id="profile-button">
                        <svg aria-label="Profile" class="_ab6-" color="#262626" fill="#262626" height="16" role="img" viewBox="0 0 24 24" width="16"><circle cx="12.004" cy="12.004" fill="none" r="10.5" stroke="#262626" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2px"></circle><path d="M18.793 20.014a6.08 6.08 0 00-1.778-2.447 3.991 3.991 0 00-2.386-.791H9.38a3.994 3.994 0 00-2.386.791 6.09 6.09 0 00-1.779 2.447" fill="none" stroke="#262626" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2px"></path><circle cx="12.006" cy="9.718" fill="none" r="4.109" stroke="#262626" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2px"></circle></svg>
                        <div className="profile-text"> Profile </div>
                    </NavLink>
                    {/* <div className="logout-dropdown"> */}
                    <LogoutButton setLoadProfile={setLoadProfile} />
                    {/* </div> */}
                </div>
            )}
        </div>
    )

}

export default NavDropdown;
