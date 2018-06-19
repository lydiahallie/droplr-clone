import React, { Component } from 'react';
import './App.css';
import { database } from './firebase';
import { addImage, getImages } from './actions/addImage';
import FileInput from 'react-file-input';
import { connect } from 'react-redux';

class App extends Component {
  constructor() {
    super();
    this.handleFileSelected = this.handleFileSelected.bind(this);
    this.picturesRef = database.ref('/pictures')
  }

  componentDidMount() {
    database.ref('/pictures').on('value', snapshot => this.props.getImages(snapshot.val()));
  }

  handleFileSelected(event) {
    const file = event.target.files[0]
    this.props.addImage(file)
  }

  render() {
    console.log('props', Object.values(this.props.pictures))
    return (
      <div>
        <FileInput 
          accepts=".jpg, .png, .gif"
          onChange={ this.handleFileSelected }
        />
        {Object.values(this.props.pictures).map(x => <img src={x} />)}
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
