import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./styles.css";

// Register the chart components
Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const OrderBookChart = ({ bids, asks }) => {
  // Data for the chart
  const data = {
    labels: [
      ...bids.map((bid) => bid.book_entries.price),
      ...asks.map((ask) => ask.book_entries.price),
    ],
    datasets: [
      {
        label: "Bids",
        data: bids.map((bid) => bid.book_entries.amount),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        barThickness: 13,
      },
      {
        label: "Asks",
        data: asks.map((ask) => ask.book_entries.amount),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        barThickness: 13,
      },
    ],
  };

  const options = {
    indexAxis: "y", // This makes the bars horizontal
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
  };

  return (
    <div className="full-container">
      <Bar data={data} options={options} />
    </div>
  );
};

export default OrderBookChart;
