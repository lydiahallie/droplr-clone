export const imageReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_IMAGE':
      state = action.payload || false
      break;

    case 'GET_IMAGES':
      state = action.payload || false
      break;

    default: 
      return state;
  }
}