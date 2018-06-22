import { addImage } from '../actions';
import { connect } from 'react-redux';
import { Sidebar } from '../components/Sidebar';

export const SidebarWrapper = connect(null, {addImage})(Sidebar);