export const folderReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_FOLDERS':
      state = action.payload || false
    default: 
      return state;
  }
}