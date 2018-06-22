import React, { Component } from 'react';
import { database, auth } from '../../firebase';
import { Navbar } from '../Navbar';
import { SidebarWrapper } from '../../containers/SidebarWrapper';
import PropTypes from 'prop-types';

export default class App extends Component {
  componentDidMount() {
    auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        database.ref('/users').once('value', snapshot => {
          if (!snapshot.hasChild(`${currentUser.uid}`)) {
            database.ref('/users').child(`${currentUser.uid}`).set({id: currentUser.uid})
          }
        });
      }
      this.props.addUser(currentUser);
    });
  }

  render() {
    return (
      <div className="app">
        <Navbar currentUser={this.props.user} />
        <div style={{ display: 'flex' }}>
          <SidebarWrapper />
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  addUser: PropTypes.func.isRequired,
  user: PropTypes.object,
}

App.defaultProps = {
  user: null,
}
