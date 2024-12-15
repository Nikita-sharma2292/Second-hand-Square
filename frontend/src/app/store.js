import { configureStore } from "@reduxjs/toolkit";
import authReducers from "../features/authSlice.js";
import productReducers from "../features/productSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducers,
    products: productReducers,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store;
