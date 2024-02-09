import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../../Shared';
import Cookies from "js-cookie";

const initialState = {
    posts:[],
    postsLoading:false,
    postsError:false,
    editPostOptions:{},
    editPostOptionsLoading:false,
    editPostOptionsError:false,
    saved:[],
    savedLoading:false,
    savedError:false,
};

//Action Creators
export const selectDashboardPage = state => state.dashboardPage;

//Async Functions
export const fetchPosts = createAsyncThunk("dashboardPage/fetchPosts", async ()=>{
    try{
        var result = await axios.get(`/problem`,{'headers':{'Authorization': `Bearer ${Cookies.get("token")}`}});
        return result.data;
    }catch(err){
        console.log(err);
    }
});


export const editPostOptions = createAsyncThunk("dashboardPage/editPostOptions", async ({id,userId,operation})=>{
    try{
        var result = await axios.put(`/problem/options/${id}`,{
            userId,operation
        },{'headers':{'Authorization': `Bearer ${Cookies.get("token")}`}});
        return result.data;
    }catch(err){
        console.log(err);
    }
});

export const fetchSaved = createAsyncThunk("dashboardPage/fetchSaved", async ({id})=>{
    try{
        var result = await axios.get(`/problem/saved/${id}`,{'headers':{'Authorization': `Bearer ${Cookies.get("token")}`}});
        return result.data;
    }catch(err){
        console.log(err);
    }
});

//Creating The Slice

const dashboardSlice = createSlice({
    name:'DashboardPage',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchPosts.pending,(state)=>{
            state.postsLoading = true;
        });
        builder.addCase(fetchPosts.fulfilled,(state,action)=>{
            state.postsLoading = false;
            state.postsError = false;
            state.posts = action.payload;
        });
        builder.addCase(fetchPosts.rejected,(state,action)=>{
            state.postsLoading = false;
            state.postsError = true;
            state.posts = action.payload;
        });

        builder.addCase(editPostOptions.pending,(state)=>{
            state.editPostOptionsLoading = true;
        });
        builder.addCase(editPostOptions.fulfilled,(state,action)=>{
            state.editPostOptionsLoading = false;
            state.editPostOptionsError = false;
            state.editPostOptions = action.payload;
        });
        builder.addCase(editPostOptions.rejected,(state,action)=>{
            state.editPostOptionsLoading = false;
            state.editPostOptionsError = true;
            state.editPostOptions = action.payload;
        });

        builder.addCase(fetchSaved.pending,(state)=>{
            state.savedLoading = true;
        });
        builder.addCase(fetchSaved.fulfilled,(state,action)=>{
            state.savedLoading = false;
            state.savedError = false;
            state.saved = action.payload;
        });
        builder.addCase(fetchSaved.rejected,(state,action)=>{
            state.savedLoading = false;
            state.savedError = true;
            state.saved = action.payload;
        });
        
    }
});

export default dashboardSlice.reducer;