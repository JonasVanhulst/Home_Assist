import React, { useState, useEffect } from "react";
import axios from "axios";
import { BarChart } from "@mui/x-charts/BarChart";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Snackbar, Alert, Box, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";

export default function BiaxialBarChartWithDatePicker() {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [tempData, setTempData] = useState<number[]>([]);
  const [humData, setHumData] = useState<number[]>([]);
  const [xLabels, setXLabels] = useState<string[]>([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!selectedDate) return;

    const fetchData = async () => {
      try {
        const dateStr = selectedDate.format("YYYY-MM-DD");
        console.log(`Fetching data for date: ${dateStr}`);
        const res = await axios.get(
          `http://localhost:5000/api/daydata?date=${dateStr}`
        );
        const { tempData, humData, xLabels } = res.data;

        if (!tempData.length || !humData.length) {
          setShowAlert(true);
        }

        setTempData(tempData);
        setHumData(humData);
        setXLabels(xLabels);
      } catch (error) {
        setTempData([]);
        setHumData([]);
        setXLabels([]);
        setShowAlert(true);
      }
    };

    fetchData();
  }, [selectedDate]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box p={2}>
        <Typography variant="h6" gutterBottom>
          Sensor Data Viewer
        </Typography>
        <DatePicker
          label="Select Date"
          value={selectedDate}
          onChange={(newDate) => setSelectedDate(newDate)}
        />

        <Box mt={4}>
          {tempData.length && humData.length ? (
            <BarChart
              height={300}
              series={[
                {
                  data: tempData,
                  label: "Temperature",
                  id: "temperatureId",
                  color: "red",
                  yAxisId: "leftAxisId",
                },
                {
                  data: humData,
                  label: "Humidity",
                  id: "humidityId",
                  color: "orange",
                  yAxisId: "rightAxisId",
                },
              ]}
              xAxis={[{ data: xLabels }]}
              yAxis={[
                { id: "leftAxisId", width: 50 },
                { id: "rightAxisId", position: "right" },
              ]}
            />
          ) : (
            <Typography variant="body1" mt={2}>
              No data to display.
            </Typography>
          )}
        </Box>

        <Snackbar
          open={showAlert}
          autoHideDuration={3000}
          onClose={() => setShowAlert(false)}
        >
          <Alert severity="warning" onClose={() => setShowAlert(false)}>
            No data found for selected date.
          </Alert>
        </Snackbar>
      </Box>
    </LocalizationProvider>
  );
}
