import React, { Component } from 'react';
import FolderCard from './FolderCard';
import { database } from '../../firebase';
import shortid from 'short-id';
import { CloseIcon, TrashIcon, AddIconNoCircle } from '../../assets/icons'; 
import './styles.css';
import PropTypes from 'prop-types';
import { FolderWrapperHeader, ExpandedFolder, NewFolderCard } from './PageComponents';

export default class Folders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      images: [],
    }

    this.seeFolder = this.seeFolder.bind(this);
    this.toggleExpansion = this.toggleExpansion.bind(this);
    this.deleteFolder = this.deleteFolder.bind(this);
    this.addFolder = this.addFolder.bind(this);

    this.foldersRef = database.ref('/folders');
  }

  componentDidMount() {
    this.foldersRef.on('value', snapshot => this.props.getFolders(snapshot.val()))
  }

  toggleExpansion() { 
    this.setState(({ expanded }) => ({ expanded: !expanded })) 
  }

  seeFolder(images) {
    this.setState({
      expanded: true,
      images,
    })
  }

  deleteFolder(folder) {
    database.ref('/folders').child(`folder-${folder.id}`).set(null)
  }

  addFolder() {
    const id = shortid.generate();
    this.foldersRef.child(`folder-${id}`).set({ name: 'Empty Folder', id });
  }

  render() {
    const folders = Object.values(this.props.folders);
    return (
      <div className="folders-wrapper">
        {this.state.expanded && 
        <ExpandedFolder toggleExpansion={this.toggleExpansion} images={this.state.images} />}
        <FolderWrapperHeader />
        <div className="folders">
        {folders.length && folders.map((folder, i) => 
          <FolderCard 
            deleteFolder={this.deleteFolder} 
            seeFolder={this.seeFolder} 
            i={i} 
            folder={folder} 
          />
        )}
        <NewFolderCard addFolder={this.addFolder} />
        </div>
      </div>
    )  
  }
}

Folders.propTypes = {
  folders: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    images: PropTypes.array,
    name: PropTypes.string,
  })).isRequired,
};
