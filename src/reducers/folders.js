export const folderReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_FOLDERS':
      state = action.payload || false
      break;
      
    default: 
      return state;
  }
}