import React, { Component } from 'react';
import './styles.css';
import moment from 'moment';
import { TrashIcon, FoldersIcon, ChangeIcon } from '../../assets/icons';
import shortid from 'short-id';
import { database } from '../../firebase';
import ImageCard from './ImageCard';
import PropTypes from 'prop-types';


const FolderMenu = ({ folders, addItemsToFolder }) => {
  let arr = [];
  for (let item in folders) arr.push(folders[item])
  return (
    <div className="folder-menu">
      {folders && arr.map((folder, i) => (
        <div className="folder-btn" onClick={() => addItemsToFolder(folder)} >
          {folder.name}
        </div> 
      ))} 
    </div>
  );
}

export default class ImagesWrapperHeader extends Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
      active: 2,
    }
  }

  addItemsToFolder = folder => {
    database.ref('/folders').child(`folder-${folder.id}`).update({images: this.props.selected})
  }

  toggleMenu = () => this.setState(({expanded}) => ({expanded: !expanded}))
  
  changeBtn = i => {
    this.setState({ active: i })
    if (!i) this.props.toggleSort();
  }

  render() {
    const { expanded, active } = this.state;
    const { selected, removeImages } = this.props;
    return (
      <div className="images-wrapper-header">
        <h1>Overview</h1>
        <div className="images-wrapper-header-nav">
          <div className="images-wrapper-header-icons">
            <div onClick={() => removeImages()}>
              <TrashIcon />
            </div>
            <div onClick={() => this.toggleMenu()}>
              <FoldersIcon />
            </div>
            { expanded && <FolderMenu addItemsToFolder={this.addItemsToFolder} folders={this.props.folders} />}
            <span style={{ fontWeight: '600' }}>{selected.length} selected</span>
          </div>
          <div className="images-wrapper-header-btns">
            {['Name', 'Size', 'Uploaded'].map((btn, i) => (
              <span onClick={() => this.changeBtn(i)} className={`active-${active === i}`}>{btn}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }
} 

ImagesWrapperHeader.propTypes = {
  folders: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    images: PropTypes.array,
    name: PropTypes.string,
  })),
  selected: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  toggleSort: PropTypes.func.isRequired,
  removeImages: PropTypes.func.isRequired,
}

ImagesWrapperHeader.defaultProps = {
  folders: null,
  selected: []
}
