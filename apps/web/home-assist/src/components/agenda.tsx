import * as React from "react";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
} from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const colorOptions = [
  { label: "Red", value: "#ef5350" },
  { label: "Blue", value: "#42a5f5" },
  { label: "Green", value: "#66bb6a" },
  { label: "Purple", value: "#ab47bc" },
  { label: "Orange", value: "#ffa726" },
];

export default function Agenda() {
  const [events, setEvents] = React.useState<any[]>([]);
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [start, setStart] = React.useState<Dayjs | null>(dayjs());
  const [end, setEnd] = React.useState<Dayjs | null>(dayjs().add(1, "hour"));
  const [color, setColor] = React.useState("#42a5f5");

  const handleAddEvent = () => {
    setEvents([
      ...events,
      {
        title,
        start: start?.toISOString(),
        end: end?.toISOString(),
        backgroundColor: color,
        borderColor: color,
      },
    ]);
    setOpen(false);
    setTitle("");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ p: 2 }}>
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          sx={{ mb: 2 }}
        >
          Add Event
        </Button>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          editable={false}
          selectable={true}
          events={events}
          height={600}
        />

        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Add New Event</DialogTitle>
          <DialogContent>
            <TextField
              label="Event Title"
              fullWidth
              margin="dense"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <DateTimePicker
              label="Start Time"
              value={start}
              onChange={(newVal) => setStart(newVal)}
              sx={{ mt: 2 }}
            />
            <DateTimePicker
              label="End Time"
              value={end}
              onChange={(newVal) => setEnd(newVal)}
              sx={{ mt: 2 }}
            />
            <TextField
              select
              label="Event Color"
              fullWidth
              margin="dense"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              sx={{ mt: 2 }}
            >
              {colorOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Box
                    component="span"
                    sx={{
                      backgroundColor: option.value,
                      width: 16,
                      height: 16,
                      display: "inline-block",
                      borderRadius: "50%",
                      mr: 1,
                    }}
                  />
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleAddEvent}>
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
}
