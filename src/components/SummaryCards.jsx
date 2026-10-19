import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

import {
  getExpenses,
  getMonthlyExpenses,
  getWeeklyExpenses,
} from "../services/expenseService";

const SummaryCards = () => {

  const [totalExpense, setTotalExpense] = useState(0);
  const [monthlyExpense, setMonthlyExpense] = useState(0);
  const [weeklyExpense, setWeeklyExpense] = useState(0);

  useEffect(() => {

    const fetchSummary = async () => {
      try {

        const now = new Date();
        const month = now.getMonth() + 1;
        const year = now.getFullYear();

        const totalRes = await getExpenses();
        const monthlyRes = await getMonthlyExpenses(month, year);
        const weeklyRes = await getWeeklyExpenses();

        const total = totalRes.data.content.reduce(
          (sum, exp) => sum + exp.amount,
          0
        );

        const monthly = monthlyRes.data.reduce(
          (sum, exp) => sum + exp.amount,
          0
        );

        const weekly = weeklyRes.data.reduce(
          (sum, exp) => sum + exp.amount,
          0
        );

        setTotalExpense(total);
        setMonthlyExpense(monthly);
        setWeeklyExpense(weekly);

      } catch (error) {
        console.error("Error loading summary", error);
      }
    };

    fetchSummary();

  }, []);

  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>

      {/* Total Expense */}
      <Grid item xs={12} md={4}>
        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">

              <Box>
                <Typography color="text.secondary">
                  Total Expense
                </Typography>

                <Typography variant="h5" fontWeight="bold">
                  ₹{totalExpense}
                </Typography>
              </Box>

              <TrendingUpIcon sx={{ fontSize: 40, color: "#2563eb" }} />

            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Monthly Expense */}
      <Grid item xs={12} md={4}>
        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">

              <Box>
                <Typography color="text.secondary">
                  Monthly Expense
                </Typography>

                <Typography variant="h5" fontWeight="bold">
                  ₹{monthlyExpense}
                </Typography>
              </Box>

              <CalendarMonthIcon sx={{ fontSize: 40, color: "#22c55e" }} />

            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Weekly Expense */}
      <Grid item xs={12} md={4}>
        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">

              <Box>
                <Typography color="text.secondary">
                  Weekly Expense
                </Typography>

                <Typography variant="h5" fontWeight="bold">
                  ₹{weeklyExpense}
                </Typography>
              </Box>

              <AccountBalanceWalletIcon sx={{ fontSize: 40, color: "#f59e0b" }} />

            </Box>
          </CardContent>
        </Card>
      </Grid>

    </Grid>
  );
};

export default SummaryCards;