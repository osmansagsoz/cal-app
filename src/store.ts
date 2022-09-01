import { configureStore } from "@reduxjs/toolkit";
import monthViewReducer from "./features/monthSlice";
import yearViewreducer from "./features/yearSlice";

const store = configureStore({
  reducer: {
    monthView: monthViewReducer,
    yearView: yearViewreducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
