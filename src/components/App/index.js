import React, { Component } from 'react';
import { database, auth } from '../../firebase';
import { addImage, getImages } from '../../actions/addImage';
import { connect } from 'react-redux';
import { Navbar } from '../Navbar';
import { Sidebar } from '../Sidebar';
import { Images } from '../Images';

class App extends Component {
  constructor(props) {
    super(props);
 
    this.handleFileSelected = this.handleFileSelected.bind(this);

    this.picturesRef = database.ref('/pictures');
  }

  componentDidMount() {
    auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        database.ref('/users').once('value', snapshot => {
          if (!snapshot.hasChild(`${currentUser.uid}`)) {
            database.ref('/users').child(`${currentUser.uid}`).set({id: currentUser.uid})
          }
        });
      }
    });
  }

  handleFileSelected(event) {
    const file = event.target.files[0];
    this.props.addImage(file);
  }

  render() {
    return (
      <div className="app">
        <Navbar currentUser={this.props.user} />
        <div style={{ display: 'flex' }}>
          <Sidebar />
          {this.props.children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    pictures: state.images,
    user: state.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addImage: () => dispatch(addImage),
    getImages: () => dispatch(getImages),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
