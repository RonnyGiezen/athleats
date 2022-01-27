import React from 'react';
import logo from './assets/logo.png';
import Flex from './components/Flex';
import './App.css';
import ImageButton from "./components/ImageButton";
import {NavLink} from "react-router-dom";

function App() {
    return (
        <>
            <div className="App page">
                <NavLink className="LOGIN" to={`/login`}>LOGIN</NavLink>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1>ATHLEATS</h1>
                </header>
            </div>
            <div className="page">
                <h2>Newer = Better</h2>
                <p>
                    An unofficial, fan-based project for Nike restaurants, NAME is an application for employees and
                    caterers to manage their lunch plans.
                </p>
                <Flex>
                    <ImageButton
                        href="https://gitlab.fdmci.hva.nl/android-app-development1/september-2021/dt-hans-twelker/mobile-project/project-3"
                        background="#683366"
                        backgroundLight="#856983"
                        color="#f7e3f6"
                        target="_blank"
                        annotation="1.2.4">
                        Download the App
                    </ImageButton>
                    <ImageButton
                        href="https://gitlab.fdmci.hva.nl/android-app-development1/september-2021/dt-hans-twelker/mobile-project/project-3"
                        background="#db0000"
                        backgroundLight="#d95f5f"
                        color="#FFE4C4FF"
                        target="_blank"
                        annotation="Gitlab">
                        See the Code
                    </ImageButton>
                    <ImageButton
                        href="https://gitlab.fdmci.hva.nl/android-app-development1/september-2021/dt-hans-twelker/mobile-project/project-3"
                        background="#223d8d"
                        backgroundLight="#5494bb"
                        color="#e4efff"
                        target="_blank"
                        annotation="Word">
                        Documentation
                    </ImageButton>
                </Flex>
            </div>
        </>
    );
}

export default App;
