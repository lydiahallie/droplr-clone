import React from 'react';
import { connect } from 'react-redux';
import './styles.css';
import moment from 'moment';
import { AddIcon, TrashIcon } from '../../assets/icons';

const ImagesWrapperHeader = () => (
  <div className='images-wrapper-header'>
    <h1>Overview</h1>
    <div className='images-wrapper-header-nav'>
      <div>
        <AddIcon />
        <TrashIcon />
      </div>
      <div className='images-wrapper-header-btns'>
        <span>Name</span>
        <span>Size</span>
        <span className='active'>Uploaded</span>
      </div>
    </div>
  </div>
);

const ImageCard = ({img}) => (
  <div className='image-card'>
    <div className='image-photo' style={{background: `url(${img.url})`}} />
    <span className='image-name'>{img.name}</span>
    <span className='image-date'>{moment(img.timeCreated).fromNow()}</span>
  </div>
);

const ImagesWrapper = ({pictures}) => {
  const pictureArray = Object.values(pictures);
  return (
    <div>
      <ImagesWrapperHeader />
      <div className='images-wrapper'>
      { pictureArray.length && pictureArray.map(x =>  <ImageCard img={x}/>) }
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    pictures: state
  }
}

export const Images = connect(mapStateToProps)(ImagesWrapper)
