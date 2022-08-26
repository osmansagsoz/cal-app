import css from "./header.module.css";

export const Header = () => {
  return (
    <section className={css.month_header}>
      <div className={css.month_header_selected_month}>August 2022</div>
      <div className={css.month_header_selectors}>
        <span className={css.previous_month_selector}><</span>
        <span className={css.current_month_selector}>Today</span>
        <span className={css.next_month_selector}>></span>
      </div>
    </section>
  );
};
