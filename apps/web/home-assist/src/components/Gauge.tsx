import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { useEffect, useState } from "react";
import socket from "./socket";

export default function GaugeDesign() {
  const [value, setValue] = useState(() => Math.random() * 5 + 20); // Initieel random tussen 20-25

  useEffect(() => {
    const handleNewData = (data: any) => {
      console.log("Ontvangen nieuwe data van server:", data);

      if (data && typeof data.temp === "number" && !isNaN(data.temp)) {
        // Afronden op 2 decimalen
        const roundedTemp = parseFloat(data.temp.toFixed(2));
        setValue(roundedTemp);
      }
    };

    socket.on("new_data", handleNewData);

    return () => {
      socket.off("new_data", handleNewData);
    };
  }, []);

  const getColor = () => {
    if (value > 30) return "red";
    if (value > 15) return "orange";
    return "blue";
  };

  const settings = {
    width: 200,
    height: 200,
    value,
    minValue: 0,
    maxValue: 40,
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
          fill: getColor(),
        },
        [`& .${gaugeClasses.referenceArc}`]: {
          fill: theme.palette.text.disabled,
        },
      })}
    />
  );
}
