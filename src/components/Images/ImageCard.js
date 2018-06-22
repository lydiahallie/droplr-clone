import React, { Component } from 'react';
import './styles.css';
import moment from 'moment';
import { TrashIcon, FoldersIcon, ChangeIcon } from '../../assets/icons';
import shortid from 'short-id';
import PropTypes from 'prop-types';
import { database } from '../../firebase';

export default class ImageCard extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      hovering: false,
      hoveringImg: false,
      editing: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.toggleHover = this.toggleHover.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);
    this.changeName = this.changeName.bind(this);
  }

  handleChange(e) {
    this.setState({ name: e.target.value })
  }

  toggleHover(bool) {
    this.setState({hovering: bool});
  }

  toggleEditing(e) {
    e.stopPropagation()
    this.setState({editing: true});
  }

  changeName(e) {
    e.preventDefault();
    database.ref('/pictures')
            .orderByChild('shortid')
            .equalTo(this.props.img.shortid)
            .on('value', snapshot => {
      if (snapshot.val()) {
        const child = Object.keys(snapshot.val()) 
        database.ref('/pictures').child('/'+child).update({name: this.state.name});
      }
    })
    this.setState({ 
      editing: false,
      hovering: false,
    });
  }

  render() {
    const { img, clickHandler, selected } = this.props;
    const { editing, hovering } = this.state;
    return (
      <div className={`image-card selected-${selected.includes(img)}`} onClick={() => clickHandler(img)}>
        <div className="image-photo" style={{background: `url(${img.url})`}} />
        { editing ? 
        <div>
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
          className="name-span" 
          onMouseEnter={() => this.toggleHover(true)} 
          onMouseLeave={() => this.toggleHover(false)} 
        >
          <span onClick={ e => this.toggleEditing(e) } className="image-name">{img.name}</span> 
          {hovering && <div><ChangeIcon /></div>}
        </div> }
        <span className="image-date">{moment(img.timeCreated).fromNow()}</span>
      </div>
    );
  }
};

ImageCard.propTypes = {
  selected: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  img: PropTypes.objectOf(PropTypes.string).isRequired,
  clickHandler: PropTypes.func.isRequired,
}

ImageCard.defaultProps = {
  selected: []
}