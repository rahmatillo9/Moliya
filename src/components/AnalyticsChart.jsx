import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

// Register Chart.js modules
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

export const AnalyticsChart = () => {
  // Sample data for the chart
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Views",
        data: [100, 200, 150, 250, 300, 400, 350],
        borderColor: "#3b82f6", // Blue
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Downloads",
        data: [50, 100, 90, 120, 180, 200, 250],
        borderColor: "#ef4444", // Red
        backgroundColor: "rgba(239, 68, 68, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Analytics (Views & Downloads)",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        title: {
          display: true,
          text: "Count",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-container">
      <Line data={data} options={options} />
    </div>
  );
};
