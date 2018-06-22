import React from 'react';
import { DownloadIcon, FoldersIcon, HeartIcon, ImagesIcon, PulseIcon, AudioIcon, DashboardIcon } from '../../assets/icons';

export const buttons = [
  {main: [
    {text: 'Overview', icon: <DashboardIcon />, to: '' },  
    {text: 'Folders', icon: <FoldersIcon />,  to: 'folders'},
  ]},
  {filter: [
    {text: 'Images', icon: <ImagesIcon />, to: 'images'},
    {text: 'Audio', icon: <AudioIcon />, to: 'audio' },
  ]}
];

export const spans = ['main', 'filter'];