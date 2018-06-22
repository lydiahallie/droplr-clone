export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_CURRENT_USER':
      return state = action.payload || false

    default: 
      return state;
  }
}