import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ReceiptIcon from "@mui/icons-material/Receipt";
import BarChartIcon from "@mui/icons-material/BarChart";
import CategoryIcon from "@mui/icons-material/Category";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";

const drawerWidth = 240;

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          backgroundColor: "#0f172a",
          color: "white"
        }
      }}
    >
      <Box p={3}>
        <Typography variant="h6">Expense Tracker</Typography>
      </Box>

      <List>

        <ListItem button>
          <ListItemIcon sx={{ color: "white" }}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem button>
          <ListItemIcon sx={{ color: "white" }}>
            <AddCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Add Expense" />
        </ListItem>

        <ListItem button>
          <ListItemIcon sx={{ color: "white" }}>
            <ReceiptIcon />
          </ListItemIcon>
          <ListItemText primary="Transactions" />
        </ListItem>

        <ListItem button>
          <ListItemIcon sx={{ color: "white" }}>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Analytics" />
        </ListItem>

        <ListItem button>
          <ListItemIcon sx={{ color: "white" }}>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary="Categories" />
        </ListItem>

        <ListItem button>
          <ListItemIcon sx={{ color: "white" }}>
            <AssessmentIcon />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItem>

        <ListItem button>
          <ListItemIcon sx={{ color: "white" }}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>

      </List>
    </Drawer>
  );
}

export default Sidebar;