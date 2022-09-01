import dayjs from "dayjs";
import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { createMonthsForCurrentYear } from "../../features/monthSlice";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import type { Month } from "../../types";
import { MonthCalendarItem } from "./monthCalendarItem";
import css from "./yearCalendar.module.css";

export const YearCalendar = () => {
  const dispatch = useAppDispatch();
  const { currentYearMonths } = useAppSelector((state) => state.monthView);
  const halfMonths = useMemo(
    () => currentYearMonths.slice(0, 12),
    [currentYearMonths]
  );
  console.log(halfMonths);

  //   const createMonthsForCurrentYear = useCallback((year: string) => {
  //     const newMonths = [];
  //     for (let i = 0; i < MONTHS.length; i++) {
  //       const aMonth = {
  //         date: dayjs(`${year}-${i + 1}-${i + 1}`),
  //         id: i,
  //       };
  //       newMonths.push(aMonth);
  //       return newMonths;
  //     }
  //   }, []);

  useEffect(() => {
    dispatch(createMonthsForCurrentYear());
  }, [dispatch]);

  return (
    <div className={css.year_calendar}>
      <ol className={css.year_grid}>
        {halfMonths.map((month) => {
          return (
            <li key={month.id} className={css.calendar_month}>
              <MonthCalendarItem month={month.month} year={month.year} />
            </li>
          );
        })}
      </ol>
    </div>
  );
};
