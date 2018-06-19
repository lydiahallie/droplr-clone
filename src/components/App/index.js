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

  componentDidMount() {
    this.picturesRef.on('value', snapshot => this.props.getImages(snapshot.val()));
  }

  handleFileSelected(event) {
    const file = event.target.files[0]
    this.props.addImage(file)
  }

  render() {
    return (
      <div className='app'>
        <Navbar />
        <div style={{display: 'flex'}}>
          <Sidebar />
          <Images />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    pictures: state
  }
}

export default connect(mapStateToProps, { addImage, getImages })(App);
