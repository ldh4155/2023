//스토어에 리듀서 연결
import { combineReducers } from 'redux';
import modalReducer from './modalReducer';

const rootReducer = combineReducers({
  modal: modalReducer,
  // 다른 리듀서들도 이곳에 추가...
});

export default rootReducer;