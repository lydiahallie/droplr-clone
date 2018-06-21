import React, { Component } from 'react';
import { connect } from 'react-redux';
import { database } from '../../firebase';
import { addFolder, getFolders } from '../../actions/folders';
import App from '../App';
import shortid from 'short-id';
import { CloseIcon, AddIcon, TrashIcon, AddIconNoCircle, ChangeIcon } from '../../assets/icons'; 
import './styles.css';


const FolderWrapperHeader = () => (
  <div className='images-wrapper-header'>
    <h1>Folders</h1>
    <div className='images-wrapper-header-nav'>
      <div className='images-wrapper-header-icons'>
        <div>
          <TrashIcon />
        </div>
      </div>
      <div className='images-wrapper-header-btns'>
        <span>Name</span>
        <span className='active'>Added</span>
      </div>
    </div>
  </div>
);

const ExpandedFolder = ({toggleExpansion, images}) => {
  return images ?
  <div className='expanded-folder-wrapper'>
    <div id="close-icon" onClick={ toggleExpansion }><CloseIcon /></div>
    <div className='expanded-folder-images'>
      {images.map(x => <img src={x.url} />)}
    </div>
  </div> : null
};

const NewFolderCard = ({addFolder}) => (
  <div className='folder-card' onClick={ () => addFolder() }>
    <div className='folder-card-images'>
      <div className='empty-folder'>
        <AddIconNoCircle />
      </div>
    </div>
  </div>
);

class FolderCard extends Component {
  constructor() {
    super();
    this.state = {
      hovering: false,
      hoveringSpan: false,
      editing: false,
      name: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.toggleHoverSpan = this.toggleHoverSpan.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);
    this.changeName = this.changeName.bind(this);
  }

  handleHover = bool => {
    this.setState({hovering: bool})
  }

  handleChange(e) {
    this.setState({ name: e.target.value })
  }

  toggleHoverSpan(bool) {
    this.setState({hovering: bool});
  }

  toggleEditing(e) {
    e.stopPropagation()
    this.setState({editing: true});
  }

  changeName(e) {
    e.preventDefault();
    database.ref('/folders').orderByChild('id').equalTo(this.props.folder.id).on('value', snapshot => {
      if (snapshot.val()) {
        const child = Object.keys(snapshot.val()) 
        database.ref('/folders').child('/'+child).update({name: this.state.name});
      }
    })
    this.setState({ 
      editing: false,
      hoveringSpan: false,
    });
  }

  render() {
    const { hovering } = this.state;
    const { seeFolder, folder, deleteFolder, i} = this.props;
    const active = folder.images !== undefined;
    return (
      <div>
        <div 
          className='folder-card' 
          onMouseLeave={ () => this.handleHover(false) } 
          onMouseEnter={ () => this.handleHover(true) }>
          { hovering && 
            <div className='folder-card-over'>
              <span className='folder-name'>{folder.name}</span>
              <div onClick={ () => seeFolder(folder.images) } className={`folder-card-over-btn active-${active}`}>See Folder</div>
              <div onClick={ () => deleteFolder(i) } className='folder-card-over-btn delete'>Delete</div>
            </div>
          }
          <div className='folder-card-images'>
            { active ? folder.images.map(x => 
            <img className='folder-card-img' src={x.url} />) : <div className='empty-folder' /> }
          </div>
        </div>
        { this.state.editing ? 
        <div className='folder-input-wrapper'>
          <form onSubmit={ e => this.changeName(e) }>
            <input onClick={ e => e.stopPropagation() } id="img-name-input" type='text' onChange={ e => this.handleChange(e) } value={ this.state.name } />
          </form>
        </div> :
        <div className='folder-span' onMouseEnter={() => this.toggleHoverSpan(true)} onMouseLeave={() => this.toggleHoverSpan(false)} >
          <span onClick={ e => this.toggleEditing(e) } className='folder-name'>{folder.name}</span> 
          { this.state.hoveringSpan && <div id="folder-icon"><ChangeIcon /></div> }
        </div> }
      </div>
    )
  }
};

class Folders extends Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
      images: [],
    }

    this.seeFolder = this.seeFolder.bind(this);
    this.foldersRef = database.ref('/folders');
  }

  toggleExpansion = () => this.setState(({expanded}) => ({expanded: !expanded}))

  componentDidMount() {
    this.foldersRef.on('value', snapshot => this.props.getFolders(snapshot.val()))
  }

  seeFolder(images) {
    this.setState({
      expanded: true,
      images,
    })
  }

  deleteFolder = folder => {
    database.ref('/folders').child(`folder-${folder.id}`).set(null)
  }

  addFolder = () => {
    const id = shortid.generate();
    this.foldersRef.child(`folder-${id}`).set({ name: 'Empty Folder', id});
  }

  render() {
    const folders = Object.values(this.props.folders);
    return (
      <div className='folders-wrapper'>
        {this.state.expanded && <ExpandedFolder toggleExpansion={ this.toggleExpansion } images={this.state.images} />}
        <FolderWrapperHeader />
        <div className='folders'>
        { folders.length && folders.map((folder, i) => 
          <FolderCard deleteFolder={ this.deleteFolder } seeFolder={ this.seeFolder } i={i} folder={folder} addImages={ this.addImages } />
        )}
        <NewFolderCard addFolder={ this.addFolder } />
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