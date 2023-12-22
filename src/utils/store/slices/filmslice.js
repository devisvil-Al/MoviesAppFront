import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const filmSlice = createSlice({
  name: "film",
  initialState,
  reducers: {
    getFilms: (state, action) => {
      localStorage.setItem("films", JSON.stringify(action.payload));
      state.films = action.payload;
    },
    searchFilm: (state, action) => {
      localStorage.setItem("search", JSON.stringify(action.payload));
      state.searchFilms = state.films.filter(
        (item) =>
          item.nameRU.toLowerCase().includes(action.payload.toLowerCase()) ||
          item.nameEN.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    nullSearchFilm: (state) => {
      state.searchFilms = [];
    },
    setSearchStr: (state, action) => {
      state.searchStr = action.payload;
    },
  },
});

export default filmSlice.reducer;
export const { getFilms, searchFilm, nullSearchFilm, setSearchStr } =
  filmSlice.actions;
