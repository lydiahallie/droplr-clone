import React from 'react';
import { connect } from 'react-redux';
import './styles.css';

const ImagesWrapper = ({pictures}) => {
  const pictureArray = Object.values(pictures);
  return (
    <div className='images-wrapper'>
    { pictureArray.length && pictureArray.map(x => <img className="image" src={x} />) }
    </div>
  );
}

const mapStateToProps = state => {
  return {
    pictures: state
  }
}

export const Images = connect(mapStateToProps)(ImagesWrapper)
