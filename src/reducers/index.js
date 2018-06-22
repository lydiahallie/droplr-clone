import { combineReducers } from 'redux';
import { imageReducer } from './images';
import { userReducer } from './user';
import { folderReducer } from './folders';

export default combineReducers({
  images: imageReducer,
  folders: folderReducer,
  user: userReducer,
})