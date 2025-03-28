import { combineReducers } from "@reduxjs/toolkit";
import { hospitalApi } from "../feature/api/hospitalApi";


const rootReducer=combineReducers({
    [hospitalApi.reducerPath]:hospitalApi.reducer,
   
})

export default rootReducer