import React from 'react';
import './styles.css';
import { addImage } from '../../actions/addImage';
import FileInput from 'react-file-input';
import { connect } from 'react-redux';
import { DownloadIcon, FoldersIcon, HeartIcon, ImagesIcon, PulseIcon, AudioIcon, DashboardIcon } from '../../assets/icons';

const buttons = [
  {text: 'Overview', icon: <DashboardIcon /> },
  {text: 'Activity', icon: <PulseIcon /> },
  {text: 'Folders', icon: <FoldersIcon /> },
  {text: 'Images', icon: <ImagesIcon /> },
  {text: 'Audio', icon: <AudioIcon /> },
  {text: 'Likes', icon: <HeartIcon /> },
];

export const SidebarWrapper = ({addImage}) => {
  const handleImage = event => {
    const file = event.target.files[0];
    addImage(file)
  }
  return (  
    <div className='sidebar'>
      <div className='drop-images'>
        <div className='drop-images-style'>
          <DownloadIcon />
          <FileInput 
            className='file-input'
            placeholder='Select Images'
            onChange={ e => handleImage(e) }
          />
        </div>
      </div>
      { buttons.map(x => (
        <div className='sidebar-button'>
          {x.icon}
          <span>{x.text}</span>
        </div>
      ))}
    </div>
  )
}

export const Sidebar = connect(null, {addImage})(SidebarWrapper)