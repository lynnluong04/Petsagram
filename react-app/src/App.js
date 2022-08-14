import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Profile from './components/Profile';
import SinglePostModal from './components/SinglePostModal';
import Home from './components/Splash';

function App() {
  const [loaded, setLoaded] = useState(false);
  const [previousRoute, setPreviousRoute] = useState('')
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const location = useLocation();
  const background = location.state && location.state.background;


  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    // <BrowserRouter>
    <div className='app' >
      {sessionUser && (<NavBar />)}
      <Switch location={ background || location}>
        <Route path='/' exact component={Home} />
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

        <Route path='/:userId' exact component={Profile} />
      </Switch>
      {background && <Route path='/:userId/:postId' children={<SinglePostModal/>} />}
    </div>
    // </BrowserRouter>
  );
}

export default App;
