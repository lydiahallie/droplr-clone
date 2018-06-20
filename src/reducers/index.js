import { combineReducers } from 'redux';
import { imageReducer } from './images';
import { folderReducer } from './folders';

export default combineReducers({
  images: imageReducer,
  folders: folderReducer,
})