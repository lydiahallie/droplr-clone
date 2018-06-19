import { database, storage } from '../firebase';
import shortid from 'short-id';

export const addImage = (file) => {
  const imageRef = storage.ref('/photos').child(file.name).put(file, { contentType: file.type });
  imageRef
    .then(snapshot => { 
      const { timeCreated, name } = snapshot.metadata;
      const image = storage.ref('/photos').child(file.name);
      image.getDownloadURL().then(url => {
        database.ref('/pictures').child(`/photoURL-${shortid.generate()}`).set({url, timeCreated, name, shortid: shortid.generate(), type: file.type})
      })
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

export const removeImages = val => {
  val.map(img => {
    if (img.shortid) database.ref('/pictures').orderByChild('shortid').equalTo(img.shortid).on('value', snapshot => {
      if (snapshot.val()) { 
        const child = Object.keys(snapshot.val()) 
        database.ref('/pictures').child('/'+child).remove()
      }
    })
  })
 
  
  return {
    type: null,
    payload: null,
  }
}