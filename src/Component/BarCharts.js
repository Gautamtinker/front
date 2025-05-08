import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
} from "@mui/material";
import api from "../services/api";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const BarCharts = () => {
  const [summary, setSummary] = useState({ income: 0, expense: 0 });
  const [allTransactions, setAllTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); // 0-11
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await api.get("/transactions/summary");
        setAllTransactions(res.data || []);
      } catch (err) {
        console.error("Chart data error:", err);
      }
    };
    fetchSummary();
  }, []);

  useEffect(() => {
    const filtered = allTransactions.filter((tx) => {
      const txDate = new Date(tx.date);
      return (
        txDate.getMonth() === selectedMonth &&
        txDate.getFullYear() === selectedYear
      );
    });

    let income = 0;
    let expense = 0;

    filtered.forEach((tx) => {
      const amount = Number(tx.amount);
      if (tx.type === "income") income += amount;
      else if (tx.type === "expense") expense += amount;
    });

    setSummary({ income, expense });
  }, [allTransactions, selectedMonth, selectedYear]);

  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Amount (₹)",
        data: [summary.income, summary.expense],
        backgroundColor: ["#4caf50", "#f44336"],
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1000 },
      },
    },
  };

  return (
    <div style={{ marginTop: 20 }}>
      <Typography variant="h6" gutterBottom>
        Monthly Summary
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Month</InputLabel>
            <Select
              value={selectedMonth}
              label="Month"
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {months.map((month, index) => (
                <MenuItem key={month} value={index}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>Year</InputLabel>
            <Select
              value={selectedYear}
              label="Year"
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {[2023, 2024, 2025].map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <div style={{ width: "100%", maxWidth: "1000px", margin: "auto" }}>
        <Bar
          data={data}
          options={{
            ...options,
            maintainAspectRatio: false,
          }}
          height={400}
        />
      </div>
    </div>
  );
};

export default BarCharts;
