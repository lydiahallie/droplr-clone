import React, { Component } from 'react';
import { connect } from 'react-redux';
import { database } from '../../firebase';
import { addFolder, getFolders } from '../../actions/folders';
import App from '../App';
import './styles.css';

class FolderCard extends Component {
  constructor() {
    super();
    this.state = {
      editing: false,
      name: '',
    }
  }

  clickHandler = () => this.setState(({editing}) => ({editing: !editing}));

  handleChange = e => {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className='folder-card' onClick={ this.clickHandler}>
        <button onClick={ () => this.props.addImages() }>Add Images</button>
      </div>
    );
  }
}

class Folders extends Component {
  constructor() {
    super();
    this.state = {
      editing: false,
      name: '',
      images: [],
    }

    this.handleEditing = this.handleEditing.bind(this);
  }

  addImages = () => this.setState(({editing}) => ({editing: !editing}))

  handleEditing(folder) {
    this.setState({ editing: folder })
  }

  componentDidMount() {
    database.ref('/folders').on('value', snapshot => this.props.getFolders(snapshot.val()))
  }

  render() {
    const folders = Object.values(this.props.folders);
    return (
      <div className='folders-wrapper'>
        <div className='folders-header'>
          <span id="add-folder" onClick={ () => this.props.addFolder() }>Add Folder</span>
          <div className='folders'>
          { folders.length && folders.map(x => 
            <FolderCard addImages={ this.addImages } />
          )}
          </div>
        </div>
      </div>
    )  
  }
}

// this.props.folders.length ? 
// <div>FOlder!!!</div> :
// <p>You don't have folders yet</p>

const mapStateToProps = state => {
  return {
    folders: state.folders
  }
}

export default connect(mapStateToProps, {addFolder, getFolders})(Folders)