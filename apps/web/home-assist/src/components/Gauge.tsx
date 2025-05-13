import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { useEffect, useState } from "react";

export default function GaugeDesign() {
  // Initialize the gauge value with a random number between 20 and 25
  const [value, setValue] = useState(() => Math.random() * 5 + 20); // Random value between 20 and 25

  useEffect(() => {
    const interval = setInterval(() => {
      // Generate a random value between 20 and 25 every minute
      setValue(parseFloat((Math.random() * 5 + 10).toFixed(2))); // Random value between 20 and 25
    }, 600); // 60000ms = 1 minute

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  // Determine color based on value
  const getColor = () => {
    if (value > 30) return "red"; // Above 30, red
    if (value > 15) return "orange"; // Between 15 and 30, orange
    return "blue"; // Below 15, blue
  };

  const settings = {
    width: 200,
    height: 200,
    value: value, // Pass the raw value as a number
    minValue: 0, // Minimum value of the gauge (0)
    maxValue: 40, // Maximum value of the gauge (40)
  };

  return (
    <Gauge
      {...settings}
      cornerRadius="50%"
      sx={(theme) => ({
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: 40,
        },
        [`& .${gaugeClasses.valueArc}`]: {
          fill: getColor(), // Set color dynamically based on the value
        },
        [`& .${gaugeClasses.referenceArc}`]: {
          fill: theme.palette.text.disabled, // Color for the reference arc
        },
      })}
    />
  );
}
