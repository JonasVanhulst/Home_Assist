import { LineChart } from "@mui/x-charts/LineChart";
import { useEffect, useRef, useState } from "react";
import socket from "./socket";

type DataPoint = { x: number; y: number };

export default function HumidityLineChart() {
  const [dataset, setDataset] = useState<DataPoint[]>([]);
  const counterRef = useRef(1); // persistente teller

  useEffect(() => {
    const handleNewData = (data: { humidity: number }) => {
      if (typeof data.humidity === "number" && !isNaN(data.humidity)) {
        const newPoint: DataPoint = {
          x: counterRef.current++,
          y: parseFloat(data.humidity.toFixed(2)),
        };

        setDataset((prev) => [...prev, newPoint].slice(-20)); // max 20 punten
      }
    };

    socket.on("new_data", handleNewData);
    return () => {
      socket.off("new_data", handleNewData);
    };
  }, []);

  return (
    <LineChart
      dataset={dataset}
      xAxis={[{ label: "Metingen", dataKey: "x" }]}
      yAxis={[{ label: "Vochtigheid (%)", min: 0, max: 100 }]}
      series={[{ dataKey: "y", area: true, label: "Humidity" }]}
      height={300}
      colors={["#00aaff"]}
    />
  );
}
