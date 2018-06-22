import { database, storage } from '../firebase';
import shortid from 'short-id';

export const getFolders = val => {
  console.log('val!', val)
  return {
    type: 'GET_FOLDERS',
    payload: val
  }
}

export const addFolder = folder => {
  const id = shortid.generate();
  const folderItem = database.ref('/folders').child(`folder-${id}`).set('Empty Folder')
  return {
    type: 'ADD_FOLDER',
    payload: id
  }
}

