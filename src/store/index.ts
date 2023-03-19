import { configureStore}  from "@reduxjs/toolkit";
import courses from "./createSlice";

const store = configureStore({
    reducer: {
        store: courses
    }

})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;