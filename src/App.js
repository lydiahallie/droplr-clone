import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { storage, database } from './firebase';
import FileInput from 'react-file-input';
import shortid from 'short-id';

class App extends Component {
  constructor() {
    super();
    this.handleFileSelected = this.handleFileSelected.bind(this);
    this.updateImages = this.updateImages.bind(this);
    this.storageRef = storage.ref('/photos')
    this.picturesRef = database.ref('/pictures')
    this.state = {
      pictures: []
    }
  }

  updateImages() {
    this.picturesRef.on('value', snapshot => {
      this.setState({ pictures: Object.values(snapshot.val())})
    })
  }

  componentDidMount() {
    this.updateImages()
  }


  handleFileSelected(event) {
    const file = event.target.files[0]
    const uploadTask = this.storageRef.child(file.name).put(file, { contentType: file.type });
    const image = this.storageRef.child(file.name)
    image.getDownloadURL().then(url => {
      this.picturesRef.child(`/photoURL-${shortid.generate()}`).set(url)
      this.updateImages()
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
        { this.state.pictures.map(x => <img src={x} /> )}
      </div>
    );
  }
}

export default App;
