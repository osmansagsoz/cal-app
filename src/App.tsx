import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./App.css";

function App() {
  const [value, setValue] = useState(new Date());

  return (
    <div className="App">
      <Calendar defaultView="month" value={value} onChange={setValue} />
    </div>
  );
}

export default App;
