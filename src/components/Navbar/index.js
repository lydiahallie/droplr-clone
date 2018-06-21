import React from 'react';
import './styles.css';
import {auth, database, googleAuthProvider} from '../../firebase';

export const Navbar = ({currentUser, logOut}) => {
  return (
    <div className='navbar'>
      <h1>droplr</h1>
      <div className='navbar-content'>
        <input id='navbar-input' type='text' />
        { !currentUser ? 
        <span onClick={ () => auth.signInWithPopup(googleAuthProvider) }>
          Log In
        </span> :
        <img onClick={ () => auth.signOut() } src={currentUser.photoURL} /> }
      </div>
    </div>
  );
};