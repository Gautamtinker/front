// src/components/BudgetSummary.js
import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import api from "../services/api";

const BudgetSummary = () => {
  const [summary, setSummary] = useState({ income: 0, expense: 0 });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await api.get("/transactions/summary");
        const txs = res.data;

        let income = 0;
        let expense = 0;

        txs.forEach((tx) => {
          if (tx.type === "income") income += Number(tx.amount);
          if (tx.type === "expense") expense += Number(tx.amount);
        });
        const budgetAmount = income - expense;
        await api.post("/budget", { budgetAmount });
        setSummary({ income, expense });
      } catch (error) {
        console.error("Failed to fetch summary:", error);
      }
    };

    fetchSummary();
  }, []);

  const balance = summary.income - summary.expense;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Budget Summary
        </Typography>
        <Typography>Income: ₹{summary.income}</Typography>
        <Typography>Expense: ₹{summary.expense}</Typography>
        <Typography>Balance: ₹{balance}</Typography>
      </CardContent>
    </Card>
  );
};

export default BudgetSummary;
