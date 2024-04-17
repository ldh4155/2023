//스토어 생성
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./ConnectReducer";

const store = configureStore({
    reducer: rootReducer,
});

export default store;
