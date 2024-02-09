import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../../Shared';
import Cookies from "js-cookie";
//Initial State Decleration

const initialState = {
    users:[],
    usersLoading:false,
    usersError:false,
    addUser:{},
    addUserLoading:false,
    addUserError:false,
    deleteUser:{},
    deleteUserLoading:false,
    deleteUserError:false,
    editUser:{},
    editUserLoading:false,
    editUserError:false,
    addPost:{},
    addPostLoading:false,
    addPostError:false,
    editPost:{},
    editPostLoading:false,
    editPostError:false,
    deletePost:{},
    deletePostLoading:false,
    deletePostError:false,
};

//Action Creators
export const selectAdminPage = state => state.adminPage;

//Async Functions
export const fetchUsers = createAsyncThunk("adminPage/fetchUsers", async ()=>{
    try{
      var result = await axios.get("/user/allusers",{'headers':{'Authorization': `Bearer ${Cookies.get("token")}`}})
      return result.data;
    }catch(err){
      console.log(err);
    }
});

export const addUser = createAsyncThunk("adminPage/addUser", async ({Username,Password,Email,userID,
    employeeId,Activation,Role,superUser,createdBy})=>{
    try{
      var result = await axios.post("/user/newuser",{Username,Password,Email,userID,
        employeeId,Activation,Role,superUser,createdBy
    });
      return result.data;
    }catch(err){
        console.log(err);
    }
})

export const editUser = createAsyncThunk("adminPage/editUser", async ({
    id,Username,Password,Email,userID,employeeId,Activation,Role
})=>{
    try{
      var result = await axios.put(`/user/editUser/${id}`,{
        id,Username,Password,Email,userID,employeeId,Activation,Role
      });
      return result.data;
    }catch(err){
        console.log(err);
    }
})

export const deleteUser = createAsyncThunk("adminPage/deleteUser", async ({id})=>{
    try{
      var result = await axios.delete(`/user/deleteUser/${id}`);
      return result.data;
    }catch(err){
        console.log(err);
    }
})

export const addPost = createAsyncThunk("adminPage/addPost", async ({problemTitle,problemDescription,createdBy})=>{
    try{
      var result = await axios.post("/problem",{problemTitle,problemDescription,createdBy},
      {'headers':{'Authorization': `Bearer ${Cookies.get("token")}`}});
      return result.data;
    }catch(err){
        console.log(err);
    }
})

export const editPost = createAsyncThunk("adminPage/editPost", async ({id,problemTitle,problemDescription})=>{
    try{
      var result = await axios.put(`problem/${id}`,{problemTitle,problemDescription},
      {'headers':{'Authorization': `Bearer ${Cookies.get("token")}`}});
      return result.data;
    }catch(err){
        console.log(err);
    }
})


export const deletePost = createAsyncThunk("adminPage/deletePost", async ({id})=>{
    try{
      var result = await axios.delete(`problem/${id}`,
      {'headers':{'Authorization': `Bearer ${Cookies.get("token")}`}});
      return result.data;
    }catch(err){
        console.log(err);
    }
})


//Creating The Slice

const adminSlice = createSlice({
    name:'AdminPage',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchUsers.pending,(state)=>{
            state.usersLoading = true;
        });
        builder.addCase(fetchUsers.fulfilled,(state,action)=>{
            state.usersLoading = false;
            state.usersError = false;
            state.users = action.payload;
        });
        builder.addCase(fetchUsers.rejected,(state)=>{
            state.usersLoading = false;
            state.usersError = true;
            state.users = [];
        });

        builder.addCase(addUser.pending,(state)=>{
            state.addUserLoading = true;
        });
        builder.addCase(addUser.fulfilled,(state,action)=>{
            state.addUserLoading = false;
            state.addUserError = false;
            state.addUser = action.payload;
        });
        builder.addCase(addUser.rejected,(state,action)=>{
            state.addUserLoading = false;
            state.addUserError = true;
            state.addUser = action.payload;
        });

        builder.addCase(editUser.pending,(state)=>{
            state.editUserLoading = true;
        });
        builder.addCase(editUser.fulfilled,(state,action)=>{
            state.editUserLoading = false;
            state.editUserError = false;
            state.editUser = action.payload;
        });
        builder.addCase(editUser.rejected,(state,action)=>{
            state.editUserLoading = false;
            state.editUserError = true;
            state.editUser = action.payload;
        });
        
        builder.addCase(deleteUser.pending,(state)=>{
            state.deleteUserLoading = true;
        });
        builder.addCase(deleteUser.fulfilled,(state,action)=>{
            state.deleteUserLoading = false;
            state.deleteUserError = false;
            state.deleteUser = action.payload;
        });
        builder.addCase(deleteUser.rejected,(state,action)=>{
            state.deleteUserLoading = false;
            state.deleteUserError = true;
            state.deleteUser = action.payload;
        });

        builder.addCase(addPost.pending,(state)=>{
            state.addPostLoading = true;
        });
        builder.addCase(addPost.fulfilled,(state,action)=>{
            state.addPostLoading = false;
            state.addPostError = false;
            state.addPost = action.payload;
        });
        builder.addCase(addPost.rejected,(state)=>{
            state.addPostLoading = false;
            state.addPostError = true;
            state.addPost = [];
        });

        builder.addCase(editPost.pending,(state)=>{
            state.editPostLoading = true;
        });
        builder.addCase(editPost.fulfilled,(state,action)=>{
            state.editPostLoading = false;
            state.editPostError = false;
            state.editPost = action.payload;
        });
        builder.addCase(editPost.rejected,(state)=>{
            state.editPostLoading = false;
            state.editPostError = true;
            state.editPost = [];
        });

        builder.addCase(deletePost.pending,(state)=>{
            state.deletePostLoading = true;
        });
        builder.addCase(deletePost.fulfilled,(state,action)=>{
            state.deletePostLoading = false;
            state.deletePostError = false;
            state.deletePost = action.payload;
        });
        builder.addCase(deletePost.rejected,(state)=>{
            state.deletePostLoading = false;
            state.deletePostError = true;
            state.deletePost = [];
        });
    }
});

export default adminSlice.reducer;