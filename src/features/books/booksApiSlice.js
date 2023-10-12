import { apiSlice } from "../../app/api/apiSlice";

export const booksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: ({ name, author }) =>
        `/books?name=${name || ""}&author=${author || ""}`,
      keepUnusedDataFor: 5,
    }),

    addBook: builder.mutation({
      query: (newBook) => ({
        url: "/books",
        method: "POST",
        body: newBook,
      }),
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useGetBooksQuery, useAddBookMutation } = booksApiSlice;
