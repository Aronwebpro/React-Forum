import React from 'react';
import './css/about.css';

const About = () => {
    return (
        <div className="container">
            <div id="about">
                <div>
                    <h2>About this Project</h2>
                    <p>This web application has been built for learning purposes to learn React Js and Google Firebase
                        database</p>
                    <p>Feel free to try it out. You are welcome to create a new account and start your own
                        discussion!</p>
                </div>
                <div>
                    <h2>How to use this Forum:</h2>
                    <h3>#1 First step: Create an Account</h3>
                    <p>In order to start new discussion or reply comment you need to have an account.</p>

                    <ul>
                        <li>Click on Sign-Up link in the header and wou'll be redirected to register page.</li>
                        <li>Fill the Register form.</li>
                    </ul>

                    <h3>#2 Start New Discussion</h3>
                    <ul>
                        <li>Click on the button "New Discussion".</li>
                        <li>Type the title what you want to discuss about.</li>
                        <li>Choose the Category</li>
                        <li>Choose the discussion type.</li>
                        <li>Type what you want ask, say or share.</li>
                        <li>Click Post</li>
                    </ul>
                    <h3>#3 Read Discussion</h3>
                    <ul>
                        <li>Just click on Topic which you like</li>
                    </ul>

                    <h3>#4 Comment</h3>
                    <h3>#5 Enjoy!</h3>
                </div>

            </div>
        </div>
    )
}

export default About;