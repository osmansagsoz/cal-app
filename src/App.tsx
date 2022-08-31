import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekday from "dayjs/plugin/weekday";
import { useState, useEffect, useCallback } from "react";
import { DateGrid } from "./components/dateGrid/dateGrid";
import { DaysOfWeek } from "./components/daysOfWeek/daysOfWeek";
import { Header } from "./components/header/header";
import css from "./App.module.css";

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

const INITIAL_YEAR = dayjs().format("YYYY");
const INITIAL_MONTH = dayjs().format("M");

export type Day = {
  date: string;
  dayOfMonth: number;
  isCurrentMonth: boolean;
};

function App() {
  const [time, setTime] = useState({
    month: INITIAL_MONTH,
    year: INITIAL_YEAR,
  });
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

  const showPreviousMonth = useCallback(() => {
    let currentMonth = dayjs(new Date(+time.year, +time.month - 1, 1));
    currentMonth = dayjs(currentMonth).subtract(1, "month");
    setTime({
      month: currentMonth.format("M"),
      year: currentMonth.format("YYYY"),
    });
  }, [time.month, time.year]);

  const showNextMonth = useCallback(() => {
    let currentMonth = dayjs(new Date(+time.year, +time.month - 1, 1));
    currentMonth = dayjs(currentMonth).add(1, "month");
    setTime({
      month: currentMonth.format("M"),
      year: currentMonth.format("YYYY"),
    });
  }, [time.month, time.year]);

  const showCurrentMonth = useCallback(() => {
    const currentMonth = dayjs(new Date(+time.year, +time.month - 1, 1));
    setTime({
      month: currentMonth.format("M"),
      year: currentMonth.format("YYYY"),
    });
  }, [time.month, time.year]);

  useEffect(() => {
    setCurrentMonthDays(createDaysForCurrentMonth(time.year, time.month));
  }, [createDaysForCurrentMonth, time.month, time.year]);

  useEffect(() => {
    setTimeout(() => {
      setPreviousMonthDays(createDaysForPreviousMonth(time.year, time.month));
      setNextMonthDays(createDaysForNextMonth(time.year, time.month));
      setDays([...previousMonthDays, ...currentMonthDays, ...nextMonthDays]);
    }, 500);
  }, [
    createDaysForNextMonth,
    createDaysForPreviousMonth,
    currentMonthDays,
    nextMonthDays,
    previousMonthDays,
    time.month,
    time.year,
  ]);

  return (
    <div className={css.App}>
      <Header
        showCurrentMonth={showCurrentMonth}
        showNextMonth={showNextMonth}
        showPreviousMonth={showPreviousMonth}
        time={time}
      />
      <DaysOfWeek />
      <DateGrid days={days} />
    </div>
  );
}

export default App;
