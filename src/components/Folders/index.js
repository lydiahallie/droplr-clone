import React, { Component } from 'react';
import { connect } from 'react-redux';
import { database } from '../../firebase';
import { addFolder, getFolders } from '../../actions/folders';
import App from '../App';
import { CloseIcon } from '../../assets/icons'; 
import './styles.css';

const ExpandedFolder = ({toggleExpansion, images}) => (
  <div className='expanded-folder-wrapper'>
    <div id="close-icon" onClick={ toggleExpansion }><CloseIcon /></div>
    <div className='expanded-folder-images'>
      {images.map(x => <img src={x.url} />)}
    </div>
  </div>
)

const FolderCard = ({seeFolder, folder}) => (
  <div className='folder-card' onClick={ () => seeFolder(folder.images)}>
    <div className='folder-card-images'>
      {folder.images ? 
      folder.images.map(x => 
      <img className='folder-card-img' src={x.url} />) : 'Empty Folder' }
    </div>
  </div>
);

class Folders extends Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
      images: [],
    }

    this.seeFolder = this.seeFolder.bind(this);
  }

  toggleExpansion = () => 
    this.setState(({expanded}) => ({expanded: !expanded}))

  componentDidMount() {
    database.ref('/folders').on('value', snapshot => this.props.getFolders(snapshot.val()))
  }

  seeFolder(images) {
    this.setState({
      expanded: true,
      images,
    })
  }

  render() {
    const folders = Object.values(this.props.folders);
    return (
      <div className='folders-wrapper'>
        {this.state.expanded && <ExpandedFolder toggleExpansion={ this.toggleExpansion } images={this.state.images} />}
        <div className='images-wrapper-header'>
          <span id="add-folder" onClick={ () => this.props.addFolder() }>Add Folder</span>
        </div>
        <div className='folders'>
        { folders.length && folders.map(folder => 
          <FolderCard seeFolder={ this.seeFolder } folder={folder} addImages={ this.addImages } />
        )}
        </div>
      </div>
    )  
  }
}

const mapStateToProps = state => {
  return {
    folders: state.folders
  }
}

export default connect(mapStateToProps, {addFolder, getFolders})(Folders)