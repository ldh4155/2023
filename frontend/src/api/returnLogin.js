import store from '../redux/store';
import { LogoutUser } from "../redux/Action/LoginAction";

export const returnLogin = () => {
    try {
        store.dispatch(LogoutUser());
    } catch(error) {
        window.dispatchEvent(new CustomEvent("unauthorized"));
        throw error; //오류를 던져서 상위에서 처리하게 함
    }
};