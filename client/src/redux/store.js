import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./userSlice";
import loadersReducer from "./LoaderSlice"

const store = configureStore({
    reducer :{
        users : usersReducer,
        loaders : loadersReducer
    }
})

export default store;