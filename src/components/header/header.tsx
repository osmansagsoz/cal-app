import dayjs from "dayjs";
import { useCallback } from "react";
import {
  showCurrentMonth,
  showNextMonth,
  showPreviousMonth,
} from "../../features/monthSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import css from "./header.module.css";

export const Header = () => {
  const dispatch = useAppDispatch();
  const { month, year } = useAppSelector((state) => state.monthView);

  const displayCurrentMonth = useCallback((year: string, month: string) => {
    return dayjs(new Date(+year, +month - 1)).format("MMMM YYYY");
  }, []);

  const onPrevClick = useCallback(() => {
    dispatch(showPreviousMonth());
  }, [dispatch]);

  const onNextClick = useCallback(() => {
    dispatch(showNextMonth());
  }, [dispatch]);

  const onTodayClick = useCallback(() => {
    dispatch(showCurrentMonth());
  }, [dispatch]);

  return (
    <section className={css.month_header}>
      <div className={css.month_header_selected_month}>
        {displayCurrentMonth(year, month)}
      </div>
      <div className={css.month_header_selectors}>
        <button className={css.previous_month_selector} onClick={onPrevClick}>
          &lsaquo;&lsaquo;
        </button>
        <button className={css.current_month_selector} onClick={onTodayClick}>
          Today
        </button>
        <button className={css.next_month_selector} onClick={onNextClick}>
          &rsaquo;&rsaquo;
        </button>
      </div>
    </section>
  );
};
