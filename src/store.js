import { configureStore } from "@reduxjs/toolkit";
import citySelectorReducer from "./citySelectorSlice";

const store = configureStore({
  reducer: {
    citySelector: citySelectorReducer,
  },
});

export default store;
