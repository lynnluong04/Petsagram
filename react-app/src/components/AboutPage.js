import React, { useEffect } from 'react';


const AboutPage = ({loadAbout}) => {

    useEffect (()=> {
        loadAbout();
    })

    return (
        <div>
            About page coming soon!
        </div>
    )
}

export default AboutPage;
