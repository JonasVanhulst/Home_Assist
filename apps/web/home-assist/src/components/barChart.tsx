import { BarChart } from "@mui/x-charts/BarChart";

const humData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const tempData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];

const xLabels = [
  "Page A",
  "Page B",
  "Page C",
  "Page D",
  "Page E",
  "Page F",
  "Page G",
];

export default function BiaxialBarChart() {
  return (
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
  );
}
