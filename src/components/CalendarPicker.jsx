import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CalendarPicker = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateChange(date.toISOString().split("T")[0]); // Send date in YYYY-MM-DD format
  };

  return (
    <div className="flex items-center justify-center mt-6">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        className="w-40 p-2 bg-white border border-gray-300 rounded-md"
        dateFormat="yyyy-MM-dd"
      />
    </div>
  );
};

export default CalendarPicker;
