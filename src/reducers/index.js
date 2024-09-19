import { combineReducers } from 'redux';
import orderBookReducer from './orderBookReducer';

export default combineReducers({
  orderBook: orderBookReducer,
});
