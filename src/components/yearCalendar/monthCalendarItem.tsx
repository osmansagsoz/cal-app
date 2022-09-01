import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekday from "dayjs/plugin/weekday";
import { useCallback, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { Day } from "../../types";
import { DateGrid } from "../dateGrid/dateGrid";
import { DaysOfWeek } from "../daysOfWeek/daysOfWeek";
import { MonthCalendarItemHeader } from "./monthCalendarItemHeader";
import css from "./yearCalendar.module.css";

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

export const MonthCalendarItem = ({
  month,
  year,
}: {
  month: string;
  year: string;
}) => {
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
    setCurrentMonthDays(createDaysForCurrentMonth(year, month));
  }, [createDaysForCurrentMonth, month, year]);

  useEffect(() => {
    setTimeout(() => {
      setPreviousMonthDays(createDaysForPreviousMonth(year, month));
      setNextMonthDays(createDaysForNextMonth(year, month));
      setDays([...previousMonthDays, ...currentMonthDays, ...nextMonthDays]);
    }, 100);
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
    <Link to={`/monthCalendar/${year}/${month}`}>
      <div className={css.month_cal}>
        <MonthCalendarItemHeader month={month} year={year} />
        <DaysOfWeek />
        <DateGrid days={days} minHeight={"--yearView-height"} />
      </div>
    </Link>
  );
};
