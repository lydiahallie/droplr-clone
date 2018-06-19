import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { storage, database } from './firebase';
import FileInput from 'react-file-input';

class App extends Component {
  constructor() {
    super();
    this.handleFileSelected = this.handleFileSelected.bind(this);
    this.storageRef = storage.ref('/user-images')
    this.picturesRef = database.ref('/pictures')
    this.state = {
      img: ''
    }
  }

  handleFileSelected(event) {
    const file = event.target.files[0]
    const uploadTask = this.storageRef.child('/test').put(file, { contentType: file.type });
    const image = this.storageRef.child('/test').child(file.name)
    image.getDownloadURL().then(url => {
      this.picturesRef.child('/photoURL').set(url)
      this.setState({ img: url})
    })
  }

  render() {
    const { files } = this.state
    return (
      <div>
        <FileInput 
          accepts=".jpg, .png, .gif"
          onChange={ this.handleFileSelected }
        />
        <img src={this.state.img} />
      </div>
    );
  }
}

export default App;
