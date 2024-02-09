import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../../Shared';
//Initial State Decleration

const initialState = {
    user:{},
    loading:false,
    error:false
};

//Action Creators
export const selectLoginPage = state => state.loginPage;

//Async Functions
export const checkUser =  createAsyncThunk("loginPage/checkUser", async ({Username,Password})=>{
    var result = await axios.post("/user/login",{Username,Password});
    console.log('result', result);
    return result;
});

//Creating The Slice

const loginSlice = createSlice({
    name:'LoginPage',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(checkUser.pending,(state)=>{
            state.loading = true;
        });
        builder.addCase(checkUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.error = false;
            state.user = action.payload;
        });
        builder.addCase(checkUser.rejected,(state,action)=>{
            state.loading = false;
            state.error = true;
            state.user = action.payload;
        });
    }
});

export default loginSlice.reducer;