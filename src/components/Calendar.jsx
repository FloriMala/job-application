import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import dayjs from "dayjs";

const Calendar = ({ onClose, setSelectedDate }) => {
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDateTimePicker
          orientation='landscape'
          onAccept={(value) => {
            const formattedDate = dayjs(value).format("YYYY-MM-DD");
            setSelectedDate(formattedDate);
            onClose();
          }}
          onClose={() => {
            onClose();
          }}
        />
      </LocalizationProvider>
    </div>
  );
};

export default Calendar;
