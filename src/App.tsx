import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MonthCalendar } from "./components/monthCalendar/monthCalendar";
import { YearCalendar } from "./components/yearCalendar/yearCalendar";
import css from "./App.module.css";

function App() {
  return (
    <BrowserRouter>
      <div className={css.App}>
        <Routes>
          <Route
            path="/monthCalendar/:year/:month"
            element={<MonthCalendar />}
          />
          <Route path="/" element={<YearCalendar />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
