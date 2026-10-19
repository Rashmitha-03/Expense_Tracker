import React from "react";
import { Box, Grid } from "@mui/material";

import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import SummaryCards from "../components/SummaryCards";
import RecentTransactions from "../components/RecentTransactions";

const Dashboard = () => {
  return (
    <Box sx={{ display: "flex" }}>

      <Sidebar />

      <Box sx={{ flexGrow: 1 }}>

        <Topbar />

        <Box sx={{ p: 3, mt: 8 }}>

          {/* Summary Cards */}
          <SummaryCards />

          {/* Transactions Section */}
          <Grid container spacing={3} sx={{ mt: 2 }}>

            <Grid item xs={12} md={8}>
              <RecentTransactions />
            </Grid>

            <Grid item xs={12} md={4}>
              {/* Chart will go here next */}
            </Grid>

          </Grid>

        </Box>

      </Box>

    </Box>
  );
};

export default Dashboard;