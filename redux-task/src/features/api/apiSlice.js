import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodo: builder.query({
      query: () => "/todos",
      transformResponse: (res) => res.sort((a, b) => b.id - a.id),
      providesTags: ["Todos"]
    }),
    addTodo: builder.mutation({
      query: (todos) => ({
        url: "/todos",
        method: "POST",
        body: todos
      }),
      invalidatesTags: ["Todos"]
    }),
    updateTodo: builder.mutation({
      query: (todos) => ({
        url: `/todos/${todos.id}`,
        method: "PATCH",
        body: todos
      }),
      invalidatesTags: ["Todos"]
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
        body: id
      }),
      invalidatesTags: ["Todos"]
    }),
  }),
});

export const {
  useGetTodoQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = apiSlice;

// import { createApi , fetchBaseQuery} from "@reduxjs/toolkit/query/react"


// export const apiSlice = createApi({
//     reducerPath:"api",
//     baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500'}),
//     tagTypes: ['Todos'],
//     endpoints: (builder)=>({
//         getTodo: builder.query({
//             query: () => '/todos',
//             transformResponse: res => res.sort((a,b) => b.id - a.id),
//             providerTags: ['Todos']
//         }),
//         addTodo: builder.mutation({
//             query: (todos)=>({
//                 url: '/todos',
//                 method: 'POST',
//                 body: todos
//             }),
//             invalidatesTags : ['Todos']
//         }),
//         updateTodo: builder.mutation({
//             query: (todos)=>({
//                 url: `/todos/${todos.id}`,
//                 method: 'PATCH',
//                 body: todos
//             }),
//             invalidatesTags : ['Todos']
//     }),
//     deleteTodo: builder.mutation({
//         query: (id)=>({
//             url: `/todos/${id}`,
//             method: 'DELETE',
//             body: id
//         }),
//         invalidatesTags : ['Todos']
//     }),
// })
// })  

// export const{
//     useGetTodoQuery,
//     useAddTodoMutation,
//     useUpdateTodoMutation,
//     useDeleteTodoMutation

// } = apiSlice