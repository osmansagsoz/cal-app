import dayjs from "dayjs";
import { useCallback } from "react";
import css from "./header.module.css";

export const Header = ({
  showCurrentMonth,
  showNextMonth,
  showPreviousMonth,
  time,
}: {
  showCurrentMonth: () => void;
  showNextMonth: () => void;
  showPreviousMonth: () => void;
  time: {
    month: string;
    year: string;
  };
}) => {
  const displayCurrentMonth = useCallback((year: string, month: string) => {
    return dayjs(new Date(+year, +month - 1)).format("MMMM YYYY");
  }, []);

  const onPrevClick = useCallback(() => {
    showPreviousMonth();
  }, [showPreviousMonth]);

  const onNextClick = useCallback(() => {
    showNextMonth();
  }, [showNextMonth]);

  const onTodayClick = useCallback(() => {
    showCurrentMonth();
  }, [showCurrentMonth]);

  return (
    <section className={css.month_header}>
      <div className={css.month_header_selected_month}>
        {displayCurrentMonth(time.year, time.month)}
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
