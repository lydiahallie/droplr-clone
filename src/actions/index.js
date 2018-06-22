export const addImage = payload => {
  return { type: 'ADD_IMAGE', payload };
}

export const getImages = payload => {
  return { type: 'GET_IMAGES', payload };
}

export const getFolders = payload => {
  return { type: 'GET_FOLDERS', payload };
}

export const addUser = payload => {
  console.log("haha add user", payload)
  return { type: 'ADD_CURRENT_USER', payload };
}