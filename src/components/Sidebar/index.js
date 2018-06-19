import React from 'react';
import './styles.css';
import { addImage } from '../../actions/addImage';
import FileInput from 'react-file-input';
import { connect } from 'react-redux';

const buttons = [
  'Overview',
  'Activity',
  'Dearest',
  'Folders',
  'Images',
  'Audio',
  'Video',
  'Notes',
  'Links',
  'Files'
]

export const SidebarWrapper = ({addImage}) => {
  const handleImage = event => {
    const file = event.target.files[0];
    addImage(file)
  }
  return (  
    <div className='sidebar'>
      <div className='drop-images'>
        <div className='drop-images-style'>
          <FileInput 
            className='file-input'
            placeholder='Select Images'
            onChange={ e => handleImage(e) }
          />
        </div>
      </div>
      { buttons.map(x => (
        <div className='sidebar-button'>
          {x}
        </div>
      ))}
    </div>
  )
}

export const Sidebar = connect(null, {addImage})(SidebarWrapper)