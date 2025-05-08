import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import api from "../services/api";

ChartJS.register(ArcElement, Tooltip, Legend);

const BudgetPieChart = () => {
  const [budget, setBudget] = useState(0);
  const [expense, setExpense] = useState(0);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await api.get("/transactions/budget-summary"); // API call
        setBudget(res.data.budget);
        setExpense(res.data.expense);
      } catch (err) {
        console.error("Error fetching budget summary", err);
      }
    };
    fetchSummary();
  }, []);

  const remaining = Math.max(budget - expense, 0); // Avoid negative remaining budget

  const data = {
    labels: ["Expense", "Remaining"], // Labels for the pie chart
    datasets: [
      {
        label: "Budget Usage",
        data: [expense, remaining], // Data points for expense and remaining budget
        backgroundColor: ["#ff6384", "#36a2eb"], // Colors for each segment
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "#fff", borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h6" gutterBottom>
        Budget Pie Chart
      </Typography>
      {budget === 0 && expense === 0 ? (
        <Typography color="textSecondary">
          No budget or expenses recorded this month.
        </Typography>
      ) : (
        <>
          <Typography variant="body1">Budget: ₹{budget}</Typography>
          <Typography variant="body1">Expense: ₹{expense}</Typography>
          <Box sx={{ width: 300, height: 300, marginTop: 2 }}>
            <Pie data={data} /> {/* Render Pie Chart */}
          </Box>
        </>
      )}
    </Box>
  );
};

export default BudgetPieChart;
