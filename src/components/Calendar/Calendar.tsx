import React, { JSX, useState } from "react";
import "./Calendar.css";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const getDaysInMonth = (month: number, year: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (month: number, year: number): number => {
  return new Date(year, month, 1).getDay();
};

interface CalendarProps {
  setSelectedDate: (date: Date | null) => void;
  selectedDate: Date | null;
}

const Calendar: React.FC<CalendarProps> = ({ setSelectedDate,selectedDate }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [view, setView] = useState<"monthly" | "weekly" | "daily">("monthly");

  const handleMonthChange = (direction: number) => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + direction, 1));
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
    console.log("Selected Date:", newDate.toDateString());
  };

  const handleArrowChange = (direction: number) => {
    if (view === "monthly") {
      handleMonthChange(direction);
    } else if (view === "weekly" && selectedDate) {
      const newDate = new Date(selectedDate);
      newDate.setDate(selectedDate.getDate() + 7 * direction);
      setSelectedDate(newDate);
      setCurrentDate(newDate);
    } else if (view === "daily" && selectedDate) {
      const newDate = new Date(selectedDate);
      newDate.setDate(selectedDate.getDate() + direction);
      setSelectedDate(newDate);
      setCurrentDate(newDate);
    }
  };

  const renderMonthlyView = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(month, year);
    const firstDay = getFirstDayOfMonth(month, year);

    let daysArray: JSX.Element[] = [];

    for (let i = 0; i < firstDay; i++) {
      daysArray.push(<div key={`empty-${i}`} className="empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = selectedDate && selectedDate.getDate() === day && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;
      daysArray.push(
        <div key={day} className={`day ${isSelected ? 'selected' : ''}`} onClick={() => handleDateClick(day)}>
          {day}
        </div>
      );
    }

    return (
      <div className="calendar-grid">
        {daysOfWeek.map((day) => (
          <div key={day} className="day-label">
            {day}
          </div>
        ))}
        {daysArray}
      </div>
    );
  };

  const renderWeeklyView = () => {
    const selected = selectedDate || new Date();
    const startOfWeek = new Date(selected);
    startOfWeek.setDate(selected.getDate() - selected.getDay());

    let weekDays: JSX.Element[] = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      const isSelected = selectedDate && selectedDate.toDateString() === day.toDateString();

      weekDays.push(
        <div key={day.toDateString()} className={`day ${isSelected ? 'selected' : ''}`} onClick={() => setSelectedDate(day)}>
          {day.getDate()}
        </div>
      );
    }

    return (
      <div className="calendar-grid">
        {daysOfWeek.map((day) => (
          <div key={day} className="day-label">
            {day}
          </div>
        ))}
        {weekDays}
      </div>
    );
  };

  const renderDailyView = () => {
    const day = selectedDate || new Date();
    return (
      <div className="daily-view">
        <h3>{day.toDateString()}</h3>
        <div className="day large">{day.getDate()}</div>
      </div>
    );
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      handleArrowChange(-1);
    } else if (event.key === "ArrowRight") {
      handleArrowChange(1);
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedDate, view]);

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={() => handleArrowChange(-1)}>◀</button>
        <h2>
          {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
        </h2>
        <button onClick={() => handleArrowChange(1)}>▶</button>
      </div>

      <div className="view-buttons">
        <button onClick={() => setView("monthly")}>Monthly</button>
        <button onClick={() => setView("weekly")}>Weekly</button>
        <button onClick={() => setView("daily")}>Daily</button>
      </div>

      {view === "monthly" && renderMonthlyView()}
      {view === "weekly" && renderWeeklyView()}
      {view === "daily" && renderDailyView()}

      {selectedDate && <p>Selected Date: {selectedDate.toDateString()}</p>}
    </div>
  );
};
export default Calendar;