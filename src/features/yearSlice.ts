/* eslint-disable sort-keys */
import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import type { Month } from "../types";

const INITIAL_YEAR = dayjs().format("YYYY");
const INITIAL_MONTH = dayjs(new Date(+INITIAL_YEAR, 1, 1)).format("M");

type InitialStateType = {
  currentYearMonths: Month[];
  month: string;
  year: string;
};

const initialState: YearViewState = {
  currentYearMonths: [],
  month: INITIAL_MONTH,
  year: INITIAL_YEAR,
};

const yearSlice = createSlice({
  initialState,
  name: "yearView",
  reducers: {
    createMonthsForCurrentYear(state) {
      for (let i = 0; i < 12; i++) {
        const aMonth = {
          date: dayjs(`${state.year}-${i + 1}-${i + 1}`).format("MMMM YYYY"),
          id: i,
          name: dayjs(`${state.year}-${i + 1}-${i + 1}`).format("MMMM"),
        };
        state.currentYearMonths.push(aMonth);
      }
    },
  },
});

export const { createMonthsForCurrentYear } = yearSlice.actions;
export default yearSlice.reducer;
