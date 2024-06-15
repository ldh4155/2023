import store from '../redux/store';
import { LogoutUser } from "../redux/Action/LoginAction";

export const returnLogin = async() => {
    store.dispatch(LogoutUser());
    window.dispatchEvent(new CustomEvent("unauthorized"));
    throw error; // 중요한 부분: 오류를 던져서 상위에서 처리하게 함
};