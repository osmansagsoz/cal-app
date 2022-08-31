import css from "./daysOfWeek.module.css";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const DaysOfWeek = () => {
  return (
    <ol className={css.days_of_week}>
      {WEEKDAYS.map((day) => (
        <li key={day}>{day}</li>
      ))}
    </ol>
  );
};
