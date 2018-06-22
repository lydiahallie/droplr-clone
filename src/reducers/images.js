export const imageReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_IMAGE':
      return state = action.payload || false

    case 'GET_IMAGES':
      return state = action.payload || false

    default: 
      return state;
  }
}