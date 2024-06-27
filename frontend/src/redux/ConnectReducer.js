//스토어에 리듀서 연결
import { combineReducers } from 'redux';
import modalReducer from './Reducer/modalReducer';
import loginReducer from './Reducer/loginReducer';

const rootReducer = combineReducers({
  modal: modalReducer,
  loginState: loginReducer,
  // 다른 리듀서들도 이곳에 추가...
});

export default rootReducer;