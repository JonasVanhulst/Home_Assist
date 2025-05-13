import { LineChart } from "@mui/x-charts/LineChart";
import { useEffect, useState } from "react";

function generateDataPoint(x: number) {
  const y = +(Math.random() * 20 - 3).toFixed(2); // 0 to 40
  x = +x.toFixed(2);
  return { x, y };
}

export default function BasicLineChart() {
  const [dataset, setDataset] = useState(() => {
    // Initialize with one point
    return [generateDataPoint(1)];
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setDataset((prevData) => {
        const nextX =
          prevData.length > 0 ? prevData[prevData.length - 1].x + 1 : 1;
        const newData = generateDataPoint(nextX);

        // Keep only the last 20 points
        const updatedDataset = [...prevData, newData].slice(-20);

        return updatedDataset;
      });
    }, 6000); // 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <LineChart
      dataset={dataset}
      xAxis={[{ dataKey: "x" }]}
      yAxis={[{ min: 0, max: 40 }]}
      series={[{ dataKey: "y", area: true }]}
      height={300}
      colors={["orange"]}
    />
  );
}
