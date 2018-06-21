import shortid from 'short-id';
const initialState = [{id: shortid.generate(), name: 'Empty', images: []}]

export const folderReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_FOLDERS':
      state = action.payload || initialState
    default: 
      return state;
  }
}