import React, { Component } from 'react';
import { database } from '../../firebase';
import { ChangeIcon } from '../../assets/icons'; 
import PropTypes from 'prop-types';

export default class FolderCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: false,
      hoveringSpan: false,
      editing: false,
      name: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.toggleHoverSpan = this.toggleHoverSpan.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);
    this.changeName = this.changeName.bind(this);
  }

  handleHover(bool) {
    this.setState({ hovering: bool });
  }

  handleChange(e) {
    this.setState({ name: e.target.value });
  }

  toggleHoverSpan(bool) {
    this.setState({ hoveringSpan: bool });
  }

  toggleEditing(e) {
    e.stopPropagation()
    this.setState({ editing: true });
  }

  changeName(e) {
    e.preventDefault();
    database.ref('/folders').orderByChild('id').equalTo(this.props.folder.id).on('value', snapshot => {
      if (snapshot.val()) {
        const child = Object.keys(snapshot.val()) 
        database.ref('/folders').child('/'+child).update({ name: this.state.name });
      }
    })
    this.setState({ 
      editing: false,
      hoveringSpan: false,
    });
  }

  render() {
    const { hovering } = this.state;
    const { seeFolder, folder, deleteFolder } = this.props;
    const active = folder.images !== undefined;
    console.log("folder", folder)
    return (
      <div>
        <div 
          className="folder-card" 
          onMouseLeave={() => this.handleHover(false)} 
          onMouseEnter={() => this.handleHover(true)}>
          { hovering && 
            <div className="folder-card-over">
              <div onClick={() => seeFolder(folder.images)} className={`folder-card-over-btn active-${active}`}>See Folder</div>
              <div onClick={() => deleteFolder(folder)} className="folder-card-over-btn delete">Delete</div>
            </div>
          }
          <div className="folder-card-images">
            { active ? folder.images.map(x => 
            <img className="folder-card-img" src={x.url} alt={x.name} />) : <div /> 
            }
          </div>
        </div>
        { this.state.editing ? 
        <div className="folder-input-wrapper">
          <form onSubmit={e => this.changeName(e)}>
            <input 
              onClick={e => e.stopPropagation()} 
              id="img-name-input" 
              type="text" 
              onChange={e => this.handleChange(e)} 
              value={this.state.name} 
            />
          </form>
        </div> :
        <div 
          className="folder-span" 
          onMouseEnter={() => this.toggleHoverSpan(true)} 
          onMouseLeave={() => this.toggleHoverSpan(false)} 
        >
          <span onClick={ e => this.toggleEditing(e) } className="folder-name">{folder.name}</span> 
          {this.state.hoveringSpan && <div id="folder-icon"><ChangeIcon /></div>}
        </div> }
      </div>
    )
  }
};

FolderCard.propTypes = {
  deleteFolder: PropTypes.func.isRequired,
  seeFolder: PropTypes.func.isRequired,
  i: PropTypes.number.isRequired,
  folder: PropTypes.shape({
    id: PropTypes.string.isRequired,
    images: PropTypes.array,
    name: PropTypes.string,
  }).isRequired,
};