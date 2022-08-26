import css from "./daysOfWeek.module.css";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const DaysOfWeek = () => {
  return (
    <section className={css.days_of_week}>
      <ol className={css.day_grid}>
        {WEEKDAYS.map((day) => (
          <li key={day}>{day}</li>
        ))}
      </ol>
    </section>
  );
};
