import { database, storage } from '../firebase';
import shortid from 'short-id';

export const addImage = (file) => {
  storage.ref('/photos').child(file.name).put(file, { contentType: file.type });
  const image = storage.ref('/photos').child(file.name);
  image.getDownloadURL().then(url => {
    database.ref('/pictures').child(`/photoURL-${shortid.generate()}`).set(url)
  })
  let val;
  database.ref('/pictures').on('value', snapshot => val = snapshot.val());
  return {
    type: 'ADD_IMAGE',
    payload: val,
  }
}

export const getImages = val => {
  return {
    type: 'GET_IMAGES',
    payload: val,
  }
}