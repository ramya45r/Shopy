import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseURL";

//action
export const createCategoryAction = createAsyncThunk(
  "category/create",
  async (category, { rejectWithValue, getState, dispatch }) => {
 //get user token
 const user =getState().users;
 const {userAuth} =user;
 const config={
  headers: {
    Authorization:`Bearer ${userAuth?.token}`,

  }
 }
    //http call
    try {
      const { data } = await axios.post(`${baseUrl}/api/category`, {
        title: category?.title,
      },config);
     
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response.data);
    }
  }
);



// fetch all category action
export const fetchCatagoriesAction = createAsyncThunk(
  "category/fetch",
  async (category, { rejectWithValue, getState, dispatch }) => {
 //get user token
 const user =getState().users;
 const {userAuth} =user;
 const config={
  headers: {
    Authorization:`Bearer ${userAuth?.token}`,

  }
 }
    //http call
    try {
      const { data } = await axios.get(`${baseUrl}/api/category`, 
     config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response.data);
    }
  }
);

// update category action
export const updateCatagoriesAction = createAsyncThunk(
  "category/update",
  async (category, { rejectWithValue, getState, dispatch }) => {
 //get user token
 const user =getState().users;
 const {userAuth} =user;
 const config={
  headers: {
    Authorization:`Bearer ${userAuth?.token}`,

  }
 }
    //http call
    try {
      const { data } = await axios.put(`${baseUrl}/api/category/${category?.id}`, 
      {title:category?.title},
     config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response.data);
    }
  }
);

// delete category action
export const deleteCatagoriesAction = createAsyncThunk(
  "category/delete",
  async (id, { rejectWithValue, getState, dispatch }) => {
 //get user token
 const user =getState().users;
 const {userAuth} =user;
 const config={
  headers: {
    Authorization:`Bearer ${userAuth?.token}`,

  }
 }
    //http call
    try {
      const { data } = await axios.delete(`${baseUrl}/api/category/${id}`, 
     config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response.data);
    }
  }
);

// fetch details
export const fetchCatagoryAction = createAsyncThunk(
  "category/details",
  async (id, { rejectWithValue, getState, dispatch }) => {
 //get user token
 const user =getState().users;
 const {userAuth} =user;
 const config={
  headers: {
    Authorization:`Bearer ${userAuth?.token}`,

  }
 }
    //http call
    try {
      const { data } = await axios.get(`${baseUrl}/api/category/${id}`, 
     config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response.data);
    }
  }
);


//Slices

const categorySlices = createSlice({
  name: "category",
  initialState: {},
  extraReducers: (builder) => {
    //Create
    builder.addCase(createCategoryAction.pending,(state,action)=>{
      state.loading = true;

    })
    builder.addCase(createCategoryAction.fulfilled,(state,action)=>{
      state.category =action?.payload;
      state.loading = false;
      state.appErr= undefined;
      state.serverErr =undefined;
    });
    builder.addCase(createCategoryAction.rejected,(state,action)=>{
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    })
    //fetch all
    builder.addCase(fetchCatagoriesAction.pending,(state,action)=>{
      state.loading = true;
    })
    builder.addCase(fetchCatagoriesAction.fulfilled,(state,action)=>{
      state.categoryList = action?.payload;
      state.loading=false;
      state.appErr=undefined;
      state.serverErr=undefined;
    })
    builder.addCase(fetchCatagoriesAction.rejected,(state,action)=>{
      
      state.loading=false;
      state.appErr=action?.payload?.message;
      state.serverErr=action?.error?.message;
      
    })
    //update
    builder.addCase(updateCatagoriesAction.pending,(state,action)=>{
      state.loading = true;
    })
    builder.addCase(updateCatagoriesAction.fulfilled,(state,action)=>{
      state.updateCategory = action?.payload;
      state.loading=false;
      state.appErr=undefined;
      state.serverErr=undefined;
    })
    builder.addCase(updateCatagoriesAction.rejected,(state,action)=>{
      
      state.loading=false;
      state.appErr=action?.payload?.message;
      state.serverErr=action?.error?.message;
      
    })
    //Delete
    builder.addCase(deleteCatagoriesAction.pending,(state,action)=>{
      state.loading = true;
    })
    builder.addCase(deleteCatagoriesAction.fulfilled,(state,action)=>{
      state.deletedCategory = action?.payload;
      state.loading=false;
      state.appErr=undefined;
      state.serverErr=undefined;
    })
    builder.addCase(deleteCatagoriesAction.rejected,(state,action)=>{
      
      state.loading=false;
      state.appErr=action?.payload?.message;
      state.serverErr=action?.error?.message;
      
    })
     //fetch details
     builder.addCase(fetchCatagoryAction.pending,(state,action)=>{
      state.loading = true;
    })
    builder.addCase(fetchCatagoryAction.fulfilled,(state,action)=>{
      state.category = action?.payload;
      state.loading=false;
      state.appErr=undefined;
      state.serverErr=undefined;
    })
    builder.addCase(fetchCatagoryAction.rejected,(state,action)=>{
      
      state.loading=false;
      state.appErr=action?.payload?.message;
      state.serverErr=action?.error?.message;
      
    })


  },
});

export default categorySlices.reducer;