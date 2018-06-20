export const folderReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_FOLDERS':
      console.log('payload in get folders', action.payload)
      state = action.payload || false
    case 'ADD_FOLDER':
      state = action.payload || false
    default: 
      return state;
  }
}