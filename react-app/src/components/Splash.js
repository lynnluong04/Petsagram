import React, { useEffect } from 'react';
import LoginForm from './auth/LoginForm';
import SignUpForm from './auth/SignUpForm';
import Feed from './Feed';

const Home = () => {
    const sessionUser = useSelector(state => state.session.user);
    const [ loggingIn, setLoggingIn ] = useState('true')

    let content;
    if (sessionUser) {
        content = (
            <Feed />
        )
    } else if (loggingIn) {
        content = (
            <LoginForm setLoggingIn={setLoggingIn} />
        )
    } else {
        content =(
            <SignUpForm setLoggingIn={setLoggingIn}  />
        )
    }

    return (
        <div></div>
    )
}

export default Home;
