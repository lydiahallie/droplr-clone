import React from 'react';
import './styles.css';
import PropTypes from 'prop-types';
import { auth, googleAuthProvider } from '../../firebase';

export const Navbar = ({ currentUser, logOut }) => (
  <div className="navbar">
    <h1>droplr</h1>
    <div className="navbar-content">
      <input id="navbar-input" type="text" />
      {!currentUser ? 
        <span onClick={() => auth.signInWithPopup(googleAuthProvider)}>
          Log In
        </span> :
        <img onClick={() => auth.signOut()} src={currentUser.photoURL} alt="Avatar" /> 
      }
    </div>
  </div>
);

Navbar.propTypes = {
  currentUser: PropTypes.object,
}

Navbar.defaultProps = {
  currentUser: null,
}
