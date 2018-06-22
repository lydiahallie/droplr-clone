import { getFolders } from '../actions';
import { connect } from 'react-redux';
import Folders from '../components/Folders';

const mapStateToProps = state => {
  return { folders: state.folders }
}

export default connect(mapStateToProps, {getFolders})(Folders);