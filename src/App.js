import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { storage } from './firebase';
import FileInput from 'react-file-input';

class App extends Component {
  constructor() {
    super();
    this.handleFileSelected = this.handleFileSelected.bind(this);
    this.storageRef = storage.ref('/user-images').child('test');
  }

  handleFileSelected(event) {
    console.log('file!', event.target.files[0])
  }

  render() {
    return (
      <FileInput 
        accepts=".jpg, .png, .gif"
        onChange={ this.handleFileSelected }
      />
    );
  }
}

export default App;
