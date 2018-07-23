import { combineReducers } from 'redux';
import ui from './ui';
import info from './info';
import link from './link';

export default combineReducers({
  ui,
  info,
  link
});
