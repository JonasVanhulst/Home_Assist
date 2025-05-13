import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  DateCalendar,
  TimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function BasicCard() {
  const [selectedDate, setSelectedDate] = React.useState<dayjs.Dayjs | null>(
    dayjs()
  );
  const [selectedTime, setSelectedTime] = React.useState<dayjs.Dayjs | null>(
    dayjs()
  );

  return (
    <Card sx={{ minWidth: 50 }}>
      <CardContent>
        <Box sx={{ mt: 3 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="Pick Time"
              value={selectedTime}
              onChange={(newValue) => setSelectedTime(newValue || dayjs())}
              sx={{ width: "100%" }}
            />
            <DateCalendar
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              sx={{
                "& .MuiPickersDay-root.Mui-selected": {
                  backgroundColor: "primary.main",
                  color: "white",
                },
                "& .MuiPickersDay-root:not(.Mui-selected)": {
                  borderRadius: 1,
                },
              }}
            />
          </LocalizationProvider>
        </Box>
      </CardContent>
    </Card>
  );
}
