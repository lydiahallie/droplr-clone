import React from 'react';
import './styles.css';
import FileInput from 'react-file-input';
import { DownloadIcon } from '../../assets/icons';
import { NavLink } from 'react-router-dom';
import { buttons, spans } from './buttonInfo';
import { database, storage } from '../../firebase';
import shortid from 'short-id';
import PropTypes from 'prop-types';

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

export const Sidebar = ({ addImage }) => {
  function handleImage(file) {
    storage.ref('/photos').child(file.name).put(file, { contentType: file.type })
      .then(snapshot => { 
        const { timeCreated, name } = snapshot.metadata;
        const image = storage.ref('/photos').child(file.name);
        image.getDownloadURL().then(url => {
          database.ref('/pictures').child(`/photoURL-${shortid.generate()}`).set({url, timeCreated, name, shortid: shortid.generate(), type: file.type})
        })
      })
    let val;
    database.ref('/pictures').on('value', snapshot => addImage(snapshot.val()));
  }

  return (
    <div className="sidebar">
      <div className="drop-images">
        <div className="drop-images-style">
          <DownloadIcon />
          <FileInput 
            accepts=".png, .jpg, .jpeg"
            className="file-input"
            placeholder="Select Images"
            onChange={e => handleImage(e.target.files[0])}
          />
        </div>
      </div>
      <ButtonBlocks />
    </div>
  );
};

Sidebar.propTypes = {
  addImage: PropTypes.func.isRequired,
}