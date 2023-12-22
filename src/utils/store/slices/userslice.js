import { createSlice } from "@reduxjs/toolkit";

import { deleteCookie } from "../cookie/cookie";

const initialState = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserInfo: (state, action) => {
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    clearUserData: (state) => {
      localStorage.clear();
      deleteCookie("jwt");
      state.name = "";
      state.email = "";
      state.loggetIn = false;
      state.savedFilms = [];
    },
    setLoggetIn: (state) => {
      state.loggetIn = true;
    },
    setLogOut: (state) => {
      state.loggetIn = false;
    },
    getSavedFilms: (state, action) => {
      state.savedFilms = action.payload;
    },
  },
});

export default userSlice.reducer;

export const {
  getUserInfo,
  setLoggetIn,
  getSavedFilms,
  clearUserData,
  removeSavedFilm,
  setLogOut
} = userSlice.actions;
