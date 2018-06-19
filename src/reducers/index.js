import { database, storage } from '../firebase';
import shortid from 'short-id';

export const imageReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_IMAGE':
      state = action.payload

    case 'GET_IMAGES':
      state = action.payload

    default: 
      return state;
  }
}