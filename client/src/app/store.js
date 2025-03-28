import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { hospitalApi } from "../feature/api/hospitalApi";



export const hospitalStore=configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(hospitalApi.middleware)
})