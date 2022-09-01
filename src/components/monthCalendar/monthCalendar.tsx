import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekday from "dayjs/plugin/weekday";
import { useCallback, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";
import type { Day } from "../../types";
import { DateGrid } from "../dateGrid/dateGrid";
import { DaysOfWeek } from "../daysOfWeek/daysOfWeek";
import { Header } from "../header/header";
import css from "./monthCalendar.module.css";

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

type Params = {
  month: string;
  year: string;
};

export const MonthCalendar = () => {
  //   const { month, year } = useAppSelector((state) => state.monthView);
  const { month, year } = useParams<Params>();

  const [currentMonthDays, setCurrentMonthDays] = useState<Day[]>([]);
  const [previousMonthDays, setPreviousMonthDays] = useState<Day[]>([]);
  const [nextMonthDays, setNextMonthDays] = useState<Day[]>([]);
  const [days, setDays] = useState<Day[]>([]);

  const getNumberOfDaysInMonth = useCallback((year: string, month: string) => {
    return dayjs(`${year}-${month}-01`).daysInMonth();
  }, []);

  const createDaysForCurrentMonth = useCallback(
    (year: string, month: string) => {
      return [...Array(getNumberOfDaysInMonth(year, month))].map(
        (day, index) => {
          return {
            date: dayjs(`${year}-${month}-${index + 1}`).format("YYYY-MM-DD"),
            dayOfMonth: index + 1,
            isCurrentMonth: true,
          };
        }
      );
    },
    [getNumberOfDaysInMonth]
  );

  const getWeekday = useCallback((date: string) => {
    return dayjs(date).weekday();
  }, []);

  const createDaysForPreviousMonth = useCallback(
    (year: string, month: string) => {
      const firstDayOfTheMonthWeekday = getWeekday(currentMonthDays[0].date);

      const previousMonth = dayjs(`${year}-${month}-01`).subtract(1, "month");

      // Account for first day of the month on a Sunday (firstDayOfTheMonthWeekday === 0)
      const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
        ? firstDayOfTheMonthWeekday - 1
        : 6;

      const previousMonthLastMondayDayOfMonth = dayjs(currentMonthDays[0].date)
        .subtract(visibleNumberOfDaysFromPreviousMonth, "day")
        .date();

      return [...Array(visibleNumberOfDaysFromPreviousMonth)].map(
        (day, index) => {
          return {
            date: dayjs(
              `${previousMonth.year()}-${previousMonth.month() + 1}-${
                previousMonthLastMondayDayOfMonth + index
              }`
            ).format("YYYY-MM-DD"),
            dayOfMonth: previousMonthLastMondayDayOfMonth + index,
            isCurrentMonth: false,
          };
        }
      );
    },
    [currentMonthDays, getWeekday]
  );

  const createDaysForNextMonth = useCallback(
    (year: string, month: string) => {
      const lastDayOfTheMonthWeekday = getWeekday(
        `${year}-${month}-${currentMonthDays.length}`
      );

      const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
        ? 7 - lastDayOfTheMonthWeekday
        : lastDayOfTheMonthWeekday;

      return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
        return {
          date: dayjs(`${year}-${Number(month) + 1}-${index + 1}`).format(
            "YYYY-MM-DD"
          ),
          dayOfMonth: index + 1,
          isCurrentMonth: false,
        };
      });
    },
    [currentMonthDays.length, getWeekday]
  );

  useEffect(() => {
    if (month !== undefined && year !== undefined) {
      setCurrentMonthDays(createDaysForCurrentMonth(year, month));
    }
  }, [createDaysForCurrentMonth, month, year]);

  useEffect(() => {
    if (month !== undefined && year !== undefined) {
      const timer = setTimeout(() => {
        setPreviousMonthDays(createDaysForPreviousMonth(year, month));
        setNextMonthDays(createDaysForNextMonth(year, month));
        setDays([...previousMonthDays, ...currentMonthDays, ...nextMonthDays]);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [
    createDaysForNextMonth,
    createDaysForPreviousMonth,
    currentMonthDays,
    nextMonthDays,
    previousMonthDays,
    month,
    year,
  ]);

  return (
    <div className={css.month_cal}>
      <Header />
      <DaysOfWeek />
      <DateGrid days={days} minHeight={"--monthView-height"} />
    </div>
  );
};
