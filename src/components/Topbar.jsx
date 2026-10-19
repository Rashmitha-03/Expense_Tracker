import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  InputBase,
  Paper
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";

const drawerWidth = 240;

const Topbar = () => {

  const user = JSON.parse(localStorage.getItem("user"));
  const name = user?.name || "User";

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

        {/* Left */}
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "#111827" }}
        >
          Dashboard
        </Typography>

        {/* Right */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>

          {/* Search */}
          <Paper
            sx={{
              display: "flex",
              alignItems: "center",
              width: 250,
              px: 2,
              py: 0.3,
              borderRadius: 2,
              background: "#f3f4f6"
            }}
          >
            <SearchIcon sx={{ color: "gray", mr: 1 }} />
            <InputBase placeholder="Search..." fullWidth />
          </Paper>

          <IconButton>
            <NotificationsIcon />
          </IconButton>

          <IconButton>
            <SettingsIcon />
          </IconButton>

          <Typography sx={{ fontWeight: 500 }}>
            {name}
          </Typography>

          <Avatar sx={{ bgcolor: "#e5e7eb", cursor: "pointer" }} />

        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;