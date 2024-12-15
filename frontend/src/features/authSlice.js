import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import backendAPIs from "../api/backendAPIs.js";
import { startTransition } from "react";

const initialState = {
    user: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: null,
    token: '',
    isAddDeleted: false,
    allAdds: null,
    cart: null,
    isCart: false,
}

export const registerUser = createAsyncThunk(
    'auth/registerUser', 
    async (data, thunkAPI)=>{
        try{
            return await backendAPIs.registerUser(data);
        }catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const loginUser = createAsyncThunk(
    'auth/loginUser', 
    async (data, thunkAPI)=>{
        try{
            return await backendAPIs.loginUser(data);
        }catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout', 
    async (_, thunkAPI)=>{
        try{
            const token = thunkAPI.getState().auth.token;
            return await backendAPIs.logoutUser(token);
        }catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const changePassword = createAsyncThunk(
    'auth/changePassword', 
    async (data, thunkAPI)=>{
        try{
            const token = thunkAPI.getState().auth.token;
            return await backendAPIs.changePassword(data, token);
        }catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const updateProfile = createAsyncThunk(
    'auth/updateProfile', 
    async (data, thunkAPI)=>{
        try{
            const token = thunkAPI.getState().auth.token;
            return await backendAPIs.updateProfile(data, token);
        }catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const deleteAccount = createAsyncThunk(
    'auth/deleteAccount', 
    async (_, thunkAPI)=>{
        try{
            const token = thunkAPI.getState().auth.token;
            return await backendAPIs.deleteAccount(token);
        }catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const getMyAdds = createAsyncThunk(
    'auth/getMyAdds',   
    async (_, thunkAPI)=>{
        try{
            const token = thunkAPI.getState().auth.token;
            return await backendAPIs.getMyAdds(token);
        }catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const deleteMyAdd = createAsyncThunk(
    'auth/deleteMyAdd',   
    async (id, thunkAPI)=>{
        try{
            const token = thunkAPI.getState().auth.token;
            return await backendAPIs.deleteMyAdd(id, token);
        }catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const getCart = createAsyncThunk(
    'auth/getCart',   
    async (_, thunkAPI)=>{
        try{
            const token = thunkAPI.getState().auth.token;
            return await backendAPIs.getCart(token);
        }catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const addToCart = createAsyncThunk(
    'auth/addToCart',   
    async (id, thunkAPI)=>{
        try{
            const token = thunkAPI.getState().auth.token;
            if(token)
                return await backendAPIs.addToCart(id, token);
            else
                return await backendAPIs.addToCart(id);
        }catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const deleteFromCart = createAsyncThunk(
    'auth/deleteFromCart',   
    async (data, thunkAPI)=>{
        try{
            const token = thunkAPI.getState().auth.token;
            return await backendAPIs.deleteFromCart(data, token);
        }catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: state => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = '';
            state.isCart = false;
            state.isAddDeleted = false;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(registerUser.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state)=>{
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(registerUser.rejected, (state, action)=>{
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(loginUser.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload.data.user;
                state.token = action.payload.data.accessToken;
            })
            .addCase(loginUser.rejected, (state, action)=>{
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user=null;
                state.token='';
            })
            .addCase(logout.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(logout.fulfilled, (state)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.user = null;
                state.token = null;
                state.cart = null;
                state.allAdds = null;
            })
            .addCase(logout.rejected, (state, action)=>{
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.data.message;
            })
            .addCase(changePassword.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(changePassword.fulfilled, (state)=>{
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(changePassword.rejected, (state,action)=>{
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                if(state.message=="jwt malformed")   state.message="Login before to continue...";
            })
            .addCase(updateProfile.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(updateProfile.fulfilled, (state, action)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload.data;
            })
            .addCase(updateProfile.rejected, (state,action)=>{
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                if(state.message=="jwt malformed")   state.message="Login before to continue...";
            })
            .addCase(deleteAccount.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(deleteAccount.fulfilled, (state)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.user = null;
                state.token = null;
                state.cart = null;
                state.allAdds = null;
            })
            .addCase(deleteAccount.rejected, (state,action)=>{
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                if(state.message=="jwt malformed")   state.message="Login before to continue...";
            })
            .addCase(getMyAdds.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(getMyAdds.fulfilled, (state, action)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.allAdds = action.payload.data;
                state.message = action.payload.message
            })
            .addCase(getMyAdds.rejected, (state,action)=>{
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                if(state.message=="jwt malformed")   state.message="Login before to continue...";
            })
            .addCase(deleteMyAdd.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(deleteMyAdd.fulfilled, (state, action)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.isAddDeleted = true;
                state.message = action.payload.message;
            })
            .addCase(deleteMyAdd.rejected, (state,action)=>{
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                if(state.message=="jwt malformed")   state.message="Login before to continue...";
            })
            .addCase(addToCart.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(addToCart.fulfilled, (state, action)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.isCart = true;
                state.message = action.payload.message;
            })
            .addCase(addToCart.rejected, (state,action)=>{
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.isCart = false;
                if(state.message=="jwt malformed")   state.message="Login before to continue...";
            })
            .addCase(deleteFromCart.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(deleteFromCart.fulfilled, (state, action)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.isCart = true;
                state.cart = action.payload.data.cart;
            })
            .addCase(deleteFromCart.rejected, (state,action)=>{
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                if(state.message=="jwt malformed")   state.message="Login before to continue...";
            })
            .addCase(getCart.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(getCart.fulfilled, (state, action)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.cart = action.payload.data;
            })
            .addCase(getCart.rejected, (state,action)=>{
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                if(state.message=="jwt malformed")   state.message="Login before to continue...";
            })
    }
})

export const {reset} = authSlice.actions;
export default authSlice.reducer;