import React, { Component } from 'react';
import './styles.css';
import moment from 'moment';
import { TrashIcon, FoldersIcon, ChangeIcon } from '../../assets/icons';
import shortid from 'short-id';
import { database } from '../../firebase';
import ImageCard from './ImageCard';
import ImagesWrapperHeader from './Header';
import PropTypes from 'prop-types';


export class Images extends Component {
  constructor() {
    super();
    this.state = {
      selected: [],
      loaded: false,
      hovering: false,
      sortByName: false,
    }
    this.clickHandler = this.clickHandler.bind(this);
    this.removeImages = this.removeImages.bind(this);
    this.toggleSort = this.toggleSort.bind(this);
  }

  componentDidMount() {
    if (this.props.pictures.size) {
      setTimeout(() => this.setState({ loaded: true }), 1500);
    } else {
      this.setState({ loaded: true })
    }
    database.ref('/pictures').on('value', snapshot => this.props.getImages(snapshot.val()))
    database.ref('/folders').on('value', snapshot => this.props.getFolders(snapshot.val()))
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

  removeImages() {
    this.state.selected.map(img => {
      if (img.shortid) database.ref('/pictures').orderByChild('shortid').equalTo(img.shortid).on('value', snapshot => {
        if (snapshot.val()) {   
          const child = Object.keys(snapshot.val()) 
          database.ref('/pictures').child('/'+child).remove()
        }
      })
      const deleteIndex = this.state.selected.indexOf(img);
      this.state.selected.splice(deleteIndex, 1);
      return this.setState({ selected: this.state.selected });
    })
  }

  toggleSort() {
    this.setState(({ sortByName }) => ({ sortByName: !sortByName }));
  }

  compare(a,b) {
    return (a.name < b.name) ? -1 :
    (a.name > b.name) ? 1 : 0
  }

  render() {
    const { selected, loaded, sortByName } = this.state;
    const { pictures, folders } = this.props;
    const activeArray = sortByName ? Object.values(pictures).sort(this.compare) : Object.values(pictures);
    return (
      <div className='images-content'>
        <ImagesWrapperHeader 
          folders={folders} 
          selected={selected} 
          toggleSort={this.toggleSort}
          removeImages={this.removeImages}
        />
        <div className="images-wrapper">
        { activeArray.length && loaded ? activeArray.map((x, i) =>
          <ImageCard 
            selected={selected} 
            key={shortid.generate()} 
            clickHandler={this.clickHandler} 
            img={x} 
          />) :
          <div className="container">
            <div className="loader"></div>
          </div> }
        </div>
      </div>
    )
  }
}

Images.propTypes = {
  addImage: PropTypes.func.isRequired,
  folders: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    images: PropTypes.array,
    name: PropTypes.string,
  })).isRequired,
  getFolders: PropTypes.func.isRequired,
  getImages: PropTypes.func.isRequired,
  pictures: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string))
}