import type { RootState } from "@/redux/store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// types/expense.ts
export interface IExpense {
  _id: string;
  title: string;
  amount: number | string;
  category: string;
  date?: string;
}

export interface IExpenses {
  value: IExpense | null;
}

const initialState: IExpenses = {
  value: null,
};

export const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<IExpense | null>) => {
      state.value = action.payload;
    },
    removeValue: (state) => {
      state.value = null;
    },
  },
});

export const selectValue = (state: RootState) => state.expense.value;

export const { setValue, removeValue } = expenseSlice.actions;

export default expenseSlice.reducer;
