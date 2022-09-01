import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import type { Month } from "../types";

const INITIAL_YEAR = dayjs().format("YYYY");
const INITIAL_MONTH = dayjs().format("M");

type InitialStateType = {
  currentYearMonths: Month[];
  month: string;
  year: string;
};

const initialState: InitialStateType = {
  currentYearMonths: [],
  month: INITIAL_MONTH,
  year: INITIAL_YEAR,
};

const monthSlice = createSlice({
  initialState,
  name: "monthView",
  reducers: {
    createMonthsForCurrentYear(state) {
      for (let i = 0; i < 12; i++) {
        const aMonth = {
          id: i,
          month: dayjs(`${state.year}-${i + 1}-${i + 1}`).format("M"),
          name: dayjs(`${state.year}-${i + 1}-${i + 1}`).format("MMMM"),
          year: dayjs(`${state.year}-${i + 1}-${i + 1}`).format("YYYY"),
        };
        state.currentYearMonths.push(aMonth);
      }
    },
    showCurrentMonth(state) {
      const currentMonth = dayjs(new Date(+state.year, +state.month - 1, 1));
      state.month = currentMonth.format("M");
      state.year = currentMonth.format("YYYY");
    },
    showNextMonth(state) {
      let currentMonth = dayjs(new Date(+state.year, +state.month - 1, 1));
      currentMonth = dayjs(currentMonth).add(1, "month");
      state.month = currentMonth.format("M");
      state.year = currentMonth.format("YYYY");
    },
    showPreviousMonth(state) {
      let currentMonth = dayjs(new Date(+state.year, +state.month - 1, 1));
      currentMonth = dayjs(currentMonth).subtract(1, "month");
      state.month = currentMonth.format("M");
      state.year = currentMonth.format("YYYY");
    },
  },
});

export const {
  createMonthsForCurrentYear,
  showCurrentMonth,
  showNextMonth,
  showPreviousMonth,
} = monthSlice.actions;
export default monthSlice.reducer;
