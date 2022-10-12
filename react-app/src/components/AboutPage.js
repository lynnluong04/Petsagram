import React, { useEffect } from 'react';
import "./css/about.css"
const IMAGE = (imgName) => {
    return require(`./images/${imgName}`).default
}

const AboutPage = ({ loadAbout }) => {

    useEffect(() => {
        loadAbout();
    })

    return (
        <div>
            <div className='about-container'>
                <div className='about-top'>Lynn Luong</div>
                <img className='about-pic' src={IMAGE("about.png")} alt="picture of developer" />
                <div>
                    <i class="fa-brands fa-linkedin"></i>
                    <i class="fa-brands fa-github"></i>
                </div>
                <div>Hi, thanks for visiting my page! My name is Lynn and I am a software engineer.  </div>
            </div>
            About page coming soon!
        </div>
    )
}

export default AboutPage;
