import { baseApi } from "@/redux/baseApi";

export const expenseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addExpense: builder.mutation({
      query: (expenseInfo) => ({
        url: "/expense/create-expense",
        method: "POST",
        data: expenseInfo,
        credentials: "include",
      }),
      invalidatesTags: ["EXPENSE"],
    }),
    getExpenses: builder.query({
      query: () => ({
        url: "/expense/all-expense",
        method: "GET",
      }),
      providesTags: ["EXPENSE"],
      transformResponse: (response) => response.data,
    }),
    getSingleExpense: builder.query({
      query: (expenseId) => ({
        url: `/expense/each-expense/${expenseId}`,
        method: "GET",
      }),
      providesTags: ["EXPENSE"],
      transformResponse: (response) => response.data,
    }),
    updateExpense: builder.mutation({
      query: ({ expenseId, expenseInfo }) => ({
        url: `/expense/update-expense/${expenseId}`,
        method: "PATCH",
        data: expenseInfo,
        credentials: "include",
      }),
      invalidatesTags: ["EXPENSE"],
    }),
    removeExpense: builder.mutation({
      query: (expenseId) => ({
        url: `/expense/remove-expense/${expenseId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["EXPENSE"],
    }),
  }),
});

export const {
  useAddExpenseMutation,
  useGetExpensesQuery,
  useGetSingleExpenseQuery,
  useLazyGetSingleExpenseQuery,
  useUpdateExpenseMutation,
  useRemoveExpenseMutation,
} = expenseApi;
