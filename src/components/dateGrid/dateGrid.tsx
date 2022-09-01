import cx from "classnames";
import type { Day } from "../../types";
import css from "./dateGrid.module.css";

export const DateGrid = ({
  days,
  minHeight,
}: {
  days: Day[];
  minHeight: string;
}) => {
  return (
    <ol className={css.date_grid}>
      {days.map((day, i) => {
        return (
          <li
            key={i}
            className={
              day.isCurrentMonth
                ? css.calendar_day
                : cx(css.calendar_day, css.calendar_day__not_current)
            }
            style={{ minHeight: `var(${minHeight})` }}
          >
            <span>{day.dayOfMonth}</span>
          </li>
        );
      })}
    </ol>
  );
};
