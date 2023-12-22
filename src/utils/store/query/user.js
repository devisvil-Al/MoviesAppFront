import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import getCookie from "../cookie/cookie";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
  }),
  endpoints: (builder) => ({
    registry: builder.mutation({
      query: (req) => ({
        url: "/signup",
        method: "POST",
        body: req,
      }),
    }),
    authorize: builder.mutation({
      query: (req) => ({
        url: "/signin",
        method: "POST",
        body: req,
      }),
    }),
    getDataUser: builder.query({
      query: (req) => ({
        url: "/users/me",
        method: "GET",
        headers: {
          authorization: "Bearer " + getCookie("jwt"),
        },
      }),
    }),
    getSavedMoviesMutation: builder.mutation({
      query: (req) => ({
        url: "/movies",
        method: "GET",
        headers: {
          authorization: "Bearer " + getCookie("jwt"),
        },
      }),
      transformResponse: (response) => {
        return response.data;
      },
    }),
    savedMovies: builder.mutation({
      query: (req) => ({
        url: "/movies",
        method: "POST",
        headers: {
          authorization: "Bearer " + getCookie("jwt"),
        },
        body: {
          country: req.country,
          director: req.director,
          duration: req.duration,
          year: req.year,
          description: req.description,
          image: `https://api.nomoreparties.co/${req.image.url}`,
          trailerLink: req.trailerLink,
          thumbnail: `https://api.nomoreparties.co/${req.image.formats.thumbnail.url}`,
          id: req.id,
          nameRU: req.nameRU,
          nameEN: req.nameEN,
        },
      }),
    }),
    getSavedMovies: builder.query({
      query: (req) => ({
        url: "/movies",
        method: "GET",
        headers: {
          authorization: "Bearer " + getCookie("jwt"),
        },
      }),
    }),
    deleteMovies: builder.mutation({
      query: (req) => ({
        url: `/movies/${req.id}`,
        method: "DELETE",
        headers: {
          authorization: "Bearer " + getCookie("jwt"),
        },
      }),
    }),
  }),
});
export const {
  useRegistryMutation,
  useAuthorizeMutation,
  useGetDataUserQuery,
  useGetSavedMoviesQuery,
  useDeleteMoviesMutation,
  useSavedMoviesMutation,
  useGetSavedMoviesMutationMutation,
} = userApi;
