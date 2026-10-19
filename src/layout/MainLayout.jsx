import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Box } from "@mui/material";

function MainLayout({ children }) {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      <Box sx={{ flexGrow: 1 }}>

        <Topbar />

        <Box
          sx={{
            backgroundColor: "#f5f7fb",
            minHeight: "100vh",
            padding: 3
          }}
        >
          {children}
        </Box>

      </Box>
    </Box>
  );
}

export default MainLayout;