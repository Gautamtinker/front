import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Stack,
  Typography,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import api from "../services/api";
import dayjs from "dayjs";

const TransactionList = ({ onEdit }) => {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState({
    type: "",
    startDate: "",
    endDate: "",
  });
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const fetchTransactions = async () => {
    try {
      const params = {};
      if (filter.type) params.type = filter.type;
      if (filter.startDate) params.startDate = filter.startDate;
      if (filter.endDate) params.endDate = filter.endDate;

      const res = await api.get("/transactions/summary", { params });
      setTransactions(res.data);
      setPage(1); // reset to first page on filter change
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [filter]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/transactions/${id}`);
      fetchTransactions();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const paginated = transactions.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Transaction History
      </Typography>

      <Stack direction="row" spacing={2} my={2}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Type</InputLabel>
          <Select
            value={filter.type}
            label="Type"
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, type: e.target.value }))
            }
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </Select>
        </FormControl>

        <TextField
          type="date"
          label="Start Date"
          InputLabelProps={{ shrink: true }}
          value={filter.startDate}
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, startDate: e.target.value }))
          }
        />
        <TextField
          type="date"
          label="End Date"
          InputLabelProps={{ shrink: true }}
          value={filter.endDate}
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, endDate: e.target.value }))
          }
        />
      </Stack>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginated.map((tx) => (
            <TableRow key={tx._id}>
              <TableCell>{dayjs(tx.date).format("YYYY-MM-DD")}</TableCell>
              <TableCell>{tx.note || "-"}</TableCell>
              <TableCell>₹{tx.amount}</TableCell>
              <TableCell>{tx.type}</TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(tx)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(tx._id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination
        count={Math.ceil(transactions.length / itemsPerPage)}
        page={page}
        onChange={(_, val) => setPage(val)}
        sx={{ mt: 2 }}
      />
    </>
  );
};

export default TransactionList;
