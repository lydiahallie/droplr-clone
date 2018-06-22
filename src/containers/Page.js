import { addUser } from '../actions';
import { connect } from 'react-redux';
import App from '../components/App';

const mapStateToProps = state => {
  return { user: state.user }
}

export default connect(mapStateToProps, {addUser})(App)
