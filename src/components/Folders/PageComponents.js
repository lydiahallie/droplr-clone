import React, { Component } from 'react';
import FolderCard from './FolderCard';
import { database } from '../../firebase';
import shortid from 'short-id';
import { CloseIcon, TrashIcon, AddIconNoCircle } from '../../assets/icons'; 
import './styles.css';
import PropTypes from 'prop-types';

export const FolderWrapperHeader = () => (
  <div className="images-wrapper-header">
    <h1>Folders</h1>
    <div className="images-wrapper-header-nav">
      <div className="images-wrapper-header-icons">
        <div>
          <TrashIcon />
        </div>
      </div>
      <div className="images-wrapper-header-btns">
        <span>Name</span>
        <span className="active">Added</span>
      </div>
    </div>
  </div>
);

export const ExpandedFolder = ({ toggleExpansion, images }) => {
  return images ?
  <div className="expanded-folder-wrapper">
    <div id="close-icon" onClick={toggleExpansion}><CloseIcon /></div>
    <div className="expanded-folder-images">
      {images.map(x => <img src={x.url} alt={x.name} />)}
    </div>
  </div> : 
  null
};

export const NewFolderCard = ({ addFolder }) => (
  <div className="folder-card" onClick={() => addFolder()}>
    <div className="folder-card-images">
      <div className="empty-folder">
        <AddIconNoCircle />
      </div>
    </div>
  </div>
);

ExpandedFolder.propTypes = {
  toggleExpansion: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
}

ExpandedFolder.defaultProps = {
  images: null
}

NewFolderCard.propTypes = {
  addFolder: PropTypes.func.isRequired,
}