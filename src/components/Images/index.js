import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles.css';
import moment from 'moment';
import { AddIcon, TrashIcon } from '../../assets/icons';
import shortid from 'short-id';

const ImagesWrapperHeader = ({selected}) => (
  <div className='images-wrapper-header'>
    <h1>Overview</h1>
    <div className='images-wrapper-header-nav'>
      <div>
        <AddIcon />
        <TrashIcon />
        <span style={{fontWeight: '600'}}>{selected.length} selected</span>
      </div>
      <div className='images-wrapper-header-btns'>
        <span>Name</span>
        <span>Size</span>
        <span className='active'>Uploaded</span>
      </div>
    </div>
  </div>
);

const ImageCard = ({img, clickHandler, index, selected}) => (
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
    }
    this.clickHandler = this.clickHandler.bind(this);
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

  render() {
    console.log('this state', this.state.selected)
    const pictureArray = Object.values(this.props.pictures);
    const {selected} = this.state;
    return (
      <div>
        <ImagesWrapperHeader selected={ selected } />
        <div className='images-wrapper'>
        { pictureArray.length && pictureArray.map((x, i) => <ImageCard selected={ selected } key={ shortid.generate() } index={i} clickHandler={ this.clickHandler } img={x}/>) }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    pictures: state
  }
}

export const Images = connect(mapStateToProps)(ImagesWrapper)
