import { addImage, getImages, getFolders } from '../actions';
import { connect } from 'react-redux';
import { Images } from '../components/Images';

const mapStateToProps = state => {
  return {
    pictures: state.images,
    folders: state.folders
  }
}

export default connect(mapStateToProps, {addImage, getImages, getFolders})(Images);