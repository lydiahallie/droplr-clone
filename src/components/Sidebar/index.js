import React from 'react';
import './styles.css';
import { addImage } from '../../actions/addImage';
import FileInput from 'react-file-input';
import { connect } from 'react-redux';
import { DownloadIcon, FoldersIcon, HeartIcon, ImagesIcon, PulseIcon, AudioIcon, DashboardIcon } from '../../assets/icons';

const buttons = [
  {main: [
    {text: 'Overview', icon: <DashboardIcon /> },
    {text: 'Activity', icon: <PulseIcon /> },
    {text: 'Likes', icon: <HeartIcon /> },
    {text: 'Folders', icon: <FoldersIcon /> },
  ]},
  {filter: [
    {text: 'Images', icon: <ImagesIcon /> },
    {text: 'Audio', icon: <AudioIcon /> },
  ]}
];

const spans = ['main', 'filter'];

const ButtonBlocks = () => (
  <div>
    { spans.map((span, i) => (
      <div className='filter-block'>
        <span id="filter-span">{span}</span>
        { buttons[i][span].map(x => (
          <div className='sidebar-button'>
            {x.icon}
            <span>{x.text}</span>
          </div>
        ))}
      </div>
    ))}
  </div>
);

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
            accepts=".png, .jpg, .jpeg"
            className='file-input'
            placeholder='Select Images'
            onChange={ e => handleImage(e) }
          />
        </div>
      </div>
      <ButtonBlocks />
    </div>
  )
}

export const Sidebar = connect(null, {addImage})(SidebarWrapper)