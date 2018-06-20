import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles.css';
import moment from 'moment';
import { AddIcon, TrashIcon, FoldersIcon } from '../../assets/icons';
import shortid from 'short-id';
import _ from 'lodash';
import { getImages, addImage } from '../../actions/addImage';
import { getFolders, addFileToFolder } from '../../actions/folders';
import App from '../App';
import { database } from '../../firebase';

const FolderMenu = ({folders, addItemsToFolder}) => {
  let arr = [];
  for (let item in folders) arr.push(item)
  return (
    <div className='folder-menu'>
      {folders && arr.map((folder, i) => (
        <div className='folder-btn' onClick={ () => addItemsToFolder(folder) } >
          {folder.name ? folder.name : 'Empty Folder'}
        </div>
      ))}
    </div>
  );
}

class ImagesWrapperHeader extends Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
    }
  }

  addItemsToFolder = (folder) => {
    console.log('folder!!!', folder)
    database.ref('/folders').child(folder).set({images: this.props.selected})
  }

  toggleMenu = () => this.setState(({expanded}) => ({expanded: !expanded}))
  
  render() {
    const {expanded} = this.state;
    const {selected, removeImages} = this.props;
    return (
      <div className='images-wrapper-header'>
        <h1>Overview</h1>
        <div className='images-wrapper-header-nav'>
          <div className='images-wrapper-header-icons'>
            <AddIcon />
            <div onClick={ () => removeImages() }>
              <TrashIcon />
            </div>
            <div onClick={ () => this.toggleMenu() }>
              <FoldersIcon />
            </div>
            { expanded && <FolderMenu addItemsToFolder={ this.addItemsToFolder } folders={this.props.folders} />}
            <span style={{fontWeight: '600'}}>{selected.length} selected</span>
          </div>
          <div className='images-wrapper-header-btns'>
            <span>Name</span>
            <span>Size</span>
            <span className='active'>Uploaded</span>
          </div>
        </div>
      </div>
    )
  }
} 
  
const ImageCard = ({img, clickHandler, index, selected, removeImages}) => (
  <div className={`image-card selected-${selected.includes(img)}`} onClick={() => clickHandler(img)} >
    <div className='image-photo' style={{background: `url(${img.url})`}} />
    <span className='image-name'>{img.name}</span>
    <span className='image-date'>{moment(img.timeCreated).fromNow()}</span>
  </div>
);

class ImagesWrapper extends Component {
  constructor() {
    super();
    this.state = {
      selected: [],
      loaded: false,
    }
    this.clickHandler = this.clickHandler.bind(this);
    this.removeImages = this.removeImages.bind(this);
  }

  clickHandler(key) {
    if (this.state.selected.includes(key)) {
      const deleteIndex = this.state.selected.indexOf(key);
      this.state.selected.splice(deleteIndex, 1);
      this.setState({ selected: this.state.selected })
    } else {
      this.setState({ selected: [...this.state.selected, key]})
    }
  }

  componentDidMount() {
    database.ref('/pictures').on('value', snapshot => this.props.getImages(snapshot.val()))
    database.ref('/folders').on('value', snapshot => this.props.getFolders(snapshot.val()))
  }

  removeImages() {
    this.state.selected.map(img => {
      if (img.shortid) database.ref('/pictures').orderByChild('shortid').equalTo(img.shortid).on('value', snapshot => {
        if (snapshot.val()) { 
          const child = Object.keys(snapshot.val()) 
          database.ref('/pictures').child('/'+child).remove()
        }
      })
    })
  }

  render() {
    const {selected, loaded} = this.state;
    const {pictures} = this.props;
    const pictureArray = pictures && Object.values(pictures);
    return this.props.pictures && (
      <div>
        <ImagesWrapperHeader 
          folders={ this.props.folders } 
          addFileToFolder={ this.props.addFileToFolder }
          selected={ selected } 
          removeImages={ this.removeImages }/>
        <div className='images-wrapper'>
        { pictureArray.length && pictureArray.map((x, i) => 
          <ImageCard 
            removeImages={this.removeImages} 
            selected={ selected } 
            key={ shortid.generate() } 
            index={i} 
            clickHandler={ this.clickHandler } 
            img={x} />) }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    pictures: state.images,
    folders: state.folders
  }
}

export const Images = connect(mapStateToProps, {addImage, getImages, getFolders, addFileToFolder})(ImagesWrapper)
