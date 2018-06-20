import React, { Component } from 'react';
import { database } from '../../firebase';
import { addImage, getImages } from '../../actions/addImage';

import { connect } from 'react-redux';
import { Navbar } from '../Navbar';
import { Sidebar } from '../Sidebar';
import { Images } from '../Images';

class App extends Component {
  constructor() {
    super();

    this.handleFileSelected = this.handleFileSelected.bind(this);
    this.picturesRef = database.ref('/pictures')
  }

  handleFileSelected(event) {
    const file = event.target.files[0];
    this.props.addImage(file);
  }

  render() {
    console.log('see if it works', this.props.pictures)
    return (
      <div className='app'>
        <Navbar />
        <div style={{display: 'flex'}}>
          <Sidebar />
          { this.props.children }
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    pictures: state.images
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addImage: () => dispatch(addImage),
    getImages: () => dispatch(getImages),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
