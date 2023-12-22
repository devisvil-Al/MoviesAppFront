import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
  }),
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: (req) => ({
        url: "/",
        params: req,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetMoviesQuery } = moviesApi;
