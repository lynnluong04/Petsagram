import React, { useState, useEffect } from 'react';
import {Route, Switch, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
// import UsersList from './components/UsersList';
// import User from './components/User';
import { authenticate } from './store/session';
import Profile from './components/Profile';
import SinglePostModal from './components/SinglePostModal';
import Home from './components/Splash';
import EditUserForm from './components/EditUser';
import { thunkLoadUsers } from './store/user';
import AboutPage from './components/AboutPage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const [loadHome, setLoadHome] = useState(true);
  const [loadProfile, setLoadProfile] = useState(false);
  const [loadAbout, setLoadAbout] = useState(false)
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const location = useLocation();
  const background = location.state && location.state.background;



  useEffect(() => {
    (async () => {
      await dispatch(authenticate());

      if(sessionUser !== null) {
        await dispatch(thunkLoadUsers());
      }

      setLoaded(true);
    })();

  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    // <BrowserRouter>
    <div className='app' >
      {sessionUser && (<NavBar loadAbout={loadAbout} loadHome={loadHome} loadProfile={loadProfile} setLoadProfile={setLoadProfile} setLoadHome={setLoadHome}/>)}
      <Switch location={background || location}>

        <ProtectedRoute path='/about' exact={true}>
          <AboutPage loadAbout = {()=> {setLoadHome(false); setLoadProfile(false); setLoadAbout(true)}} />
        </ProtectedRoute>

        <ProtectedRoute path='/:userId/edit'>
          <EditUserForm />
        </ProtectedRoute>

        <ProtectedRoute path='/:userId' exact={true}>
          <Profile setLoadProfile={setLoadProfile} setLoadHome={setLoadHome} setLoadAbout={setLoadAbout}/>
        </ProtectedRoute>

        <Route path='/'  >
          {/* <Home loadHome={()=>{setLoadHome(true); setLoadProfile(false); setLoadAbout(false)}}/> */}
          <div className='down-message'>Site under maintenance 11/22/22. Will be back up in 24hours 11/23/22 </div>
        </Route>
        {/* <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route> */}
        {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute> */}
        {/* <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute> */}

      </Switch>
      {background && <Route path='/:userId/:postId' children={<SinglePostModal />} />}
    </div>
    // </BrowserRouter>
  );
}

export default App;
