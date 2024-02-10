import { apiSlice } from "@/lib/api/apiSlice"

export const todosApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTodos: builder.query({
            query: () => '/todos',
            keepUnusedDataFor: 5,
            // forceRefetch: true,
            providesTags: ['Todos']
        }),
        addTodo: builder.mutation({
            query: payload => ({
                url: '/todos',
                method: 'POST',
                body: { ...payload }
            }),
            invalidatesTags: ['Todos'],
        }),
        updateTodo: builder.mutation({
            query: payload => ({
                url: `/todos/${payload?.id}`,
                method: 'PUT',
                body: {...payload}
            }),
            invalidatesTags: ['Todos'],
        }),
        deleteTodo: builder.mutation({
            query: payload => ({
                url: `/todos/${payload}`,
                method: 'DELETE',
                body: {...payload}
            }),
            invalidatesTags: ['Todos'],
        }),
    })
})

export const {
    useGetTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation
} = todosApiSlice 