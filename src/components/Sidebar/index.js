import React from 'react';
import './styles.css';
import { addImage } from '../../actions/addImage';
import FileInput from 'react-file-input';
import { connect } from 'react-redux';
import { DownloadIcon, FoldersIcon, HeartIcon, ImagesIcon, PulseIcon, AudioIcon, DashboardIcon } from '../../assets/icons';
import { NavLink } from 'react-router-dom';
import { buttons, spans } from './buttonInfo';

const ButtonBlocks = () => (
  <div>
    {spans.map((span, i) => (
      <div className="filter-block">
        <span id="filter-span">{span}</span>
        { buttons[i][span].map(x => (
          <NavLink 
            to={`/${x.to}`}
            activeClassName="active"
            className="sidebar-button"
          >
            {x.icon}
            <span>{x.text}</span>
          </NavLink>
        ))}
      </div>
    ))}
  </div>
);

export const SidebarWrapper = ({ addImage }) => (  
  <div className="sidebar">
    <div className="drop-images">
      <div className="drop-images-style">
        <DownloadIcon />
        <FileInput 
          accepts=".png, .jpg, .jpeg"
          className="file-input"
          placeholder="Select Images"
          onChange={e => addImage(e.target.files[0])}
        />
      </div>
    </div>
    <ButtonBlocks />
  </div>
);

export const Sidebar = connect(null, {addImage})(SidebarWrapper);