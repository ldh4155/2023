import { LOGIN, LOGOUT } from "../ActionType";
import { api } from '../../api/api'
export const Login = () => ({
    type: LOGIN,
});

export const LogOut = () => ({
    type: LOGOUT,
});

export const LogoutUser = () => async (dispatch) => {
    try {
        await api.post(`signout`, {}, { withCredentials: true });
        localStorage.removeItem('access');
        dispatch(LogOut());
      } catch (error) {
        console.error("로그아웃 실패", error);
      }
  };
