// src/pages/Dashboard.js
import React, { useState } from "react";
import { Container, Grid } from "@mui/material";
import TransactionForm from "../Component/TransactionForm";
import TransactionList from "../Component/TransactionList";
import BudgetSummary from "../Component/BudgetSummary";
import BarCharts from "../Component/BarCharts";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import BudgetPieChart from "../Component/BudgetPieChart";

const Dashboard = () => {
  const [selected, setSelected] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleSuccess = () => {
    setSelected(null);
    setRefresh(!refresh);
  };

  return (
    <>
      <Header />
      <Container sx={{ paddingTop: "80px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TransactionForm selected={selected} onSuccess={handleSuccess} />
            <BudgetSummary />
          </Grid>
          <Grid item xs={12}>
            <BarCharts />
          </Grid>
          <Grid item xs={12} md={6}>
            <BudgetPieChart />
          </Grid>
          <Grid item xs={12} md={8}>
            <TransactionList onEdit={setSelected} key={refresh} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Dashboard;
