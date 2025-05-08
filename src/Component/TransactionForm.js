import React, { useState, useEffect } from "react";
import { TextField, Button, MenuItem, Stack, Typography } from "@mui/material";
import api from "../services/api";

const TransactionForm = ({ selected, onSuccess }) => {
  const [form, setForm] = useState({
    date: "",
    type: "expense",
    amount: "",
    category: "",
    note: "",
  });

  useEffect(() => {
    if (selected) setForm(selected);
  }, [selected]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form._id) {
        // If updating
        await api.put(`/transactions/${form._id}`, form);
      } else {
        await api.post("/transactions", form);
      }
      onSuccess();
      setForm({
        date: "",
        type: "expense",
        amount: "",
        category: "",
        note: "",
      });
    } catch (err) {
      console.error("Error saving transaction:", err);
    }
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        {form._id ? "Edit Transaction" : "Add New Transaction"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            name="date"
            label="Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={form.date}
            onChange={handleChange}
            required
          />
          <TextField
            name="type"
            label="Type"
            select
            value={form.type}
            onChange={handleChange}
            required
          >
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </TextField>
          <TextField
            name="amount"
            label="Amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            required
          />
          <TextField
            name="category"
            label="Category"
            value={form.category}
            onChange={handleChange}
            required
          />
          <TextField
            name="note"
            label="Note"
            multiline
            rows={2}
            value={form.note}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary">
            {form._id ? "Update" : "Save"}
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default TransactionForm;
