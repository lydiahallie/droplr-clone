import { database } from '../firebase';
import shortid from 'short-id';

export const getFolders = val => {
  return {
    type: 'GET_FOLDERS',
    payload: val
  }
}

export const addFolder = folder => {
  const id = shortid.generate();
  database.ref('/folders').child(`folder-${id}`).set('Empty Folder');
  return {
    type: 'ADD_FOLDER',
    payload: id
  }
}

