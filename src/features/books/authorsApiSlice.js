import { apiSlice } from "../../app/api/apiSlice";

export const authorsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAuthors: builder.query({
      query: () => "/authors",
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetAuthorsQuery } = authorsApiSlice;
