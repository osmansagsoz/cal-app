import dayjs from "dayjs";
import { useCallback } from "react";
import css from "./yearCalendar.module.css";

export const MonthCalendarItemHeader = ({
  month,
  year,
}: {
  month: string;
  year: string;
}) => {
  const displayCurrentMonth = useCallback((year: string, month: string) => {
    return dayjs(new Date(+year, +month - 1)).format("MMMM YYYY");
  }, []);
  return (
    <section className={css.month_header}>
      <div className={css.month_header_selected_month}>
        {displayCurrentMonth(year, month)}
      </div>
    </section>
  );
};
