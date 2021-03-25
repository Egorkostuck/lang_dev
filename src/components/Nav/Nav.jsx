import React from 'react';
import {NavLink} from 'react-router-dom';
import * as classes from './Nav.module.css';

const Nav = () => {
    return (
        <nav className={classes.nav}>
            <NavLink to="/dashboard">
                Home
            </NavLink>
            <NavLink to="/games">
                Games
            </NavLink>
            <NavLink to="/library">
                Library
            </NavLink>
            <NavLink to="/learn">
                Learn
            </NavLink>
            <NavLink to="/sign-in">
                Log In 
            </NavLink>
        </nav>
    )
}

export default Nav