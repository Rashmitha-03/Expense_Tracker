import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  IconButton,
  Box,
  Button,
  Menu,
  MenuItem
} from "@mui/material";
import { getExpenses, deleteExpense } from "../services/expenseService";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";


const categoryColors = {
  Food: "#f97316",
  Bills: "#3b82f6",
  Shopping: "#a855f7",
  Entertainment: "#14b8a6",
  Travel: "#e11d48"
};

const RecentTransactions = () => {

  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);
const [anchorEl, setAnchorEl] = useState(null);
const [selectedId, setSelectedId] = useState(null);
useEffect(() => {

  const fetchExpenses = async () => {
    try {
      const response = await getExpenses();

      const latest = response.data.content.slice(0, 5);

      setTransactions(latest);
    } catch (error) {
      console.error("Error fetching expenses", error);
    }
  };

  fetchExpenses();

}, []);
const formatDate = (date) => {
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return new Date(date).toLocaleDateString("en-GB", options);
};
const handleMenuOpen = (event, id) => {
  setAnchorEl(event.currentTarget);
  setSelectedId(id);
};

const handleMenuClose = () => {
  setAnchorEl(null);
};
const handleDelete = async (id) => {

  const confirmDelete = window.confirm("Are you sure you want to delete this expense?");

  if (!confirmDelete) return;

  try {

    await deleteExpense(id);

    // remove deleted expense from UI
    setTransactions(transactions.filter((tx) => tx.id !== id));

  } catch (error) {
    console.error("Error deleting expense", error);
  }

};
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3
      }}
    >
      <CardContent>

        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Recent Transactions
          </Typography>

          <Button
            variant="contained"
            onClick={() => navigate("/add-expense")}
            sx={{
              textTransform: "none",
              borderRadius: "10px",
              bgcolor: "#2563eb",
              "&:hover": { bgcolor: "#1d4ed8" }
            }}
          >
            + Add Expense
          </Button>
        </Box>

        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#f8fafc"
              }}
            >
              <TableCell sx={{ fontWeight: 600, px: 3 }}>
                Expense Date
              </TableCell>

              <TableCell sx={{ fontWeight: 600, px: 3 }}>
                Title
              </TableCell>

              <TableCell sx={{ fontWeight: 600, px: 3 }}>
                Category
              </TableCell>

              <TableCell sx={{ fontWeight: 600, px: 3 }}>
                Amount
              </TableCell>

              <TableCell sx={{ fontWeight: 600, px: 3 }}>
                Payment
              </TableCell>
              <TableCell sx={{ fontWeight: 600, px: 3 }}>
  Actions
</TableCell>
            
            </TableRow>
          </TableHead>

          <TableBody>
            {transactions.map((tx) => (

              <TableRow key={tx.id} hover>

                <TableCell sx={{ px: 3, py: 2 }}>
                 {formatDate(tx.expenseDate)}
                </TableCell>

                <TableCell sx={{ px: 3 }}>
                  {tx.title}
                </TableCell>

                <TableCell sx={{ px: 3 }}>
                  <Chip
                    label={tx.category}
                    size="small"
                    sx={{
                      backgroundColor: categoryColors[tx.category] || "#64748b",
                      color: "white",
                      fontWeight: 500
                    }}
                  />
                </TableCell>

                <TableCell
                  sx={{
                    px: 3,
                    color: "#ef4444",
                    fontWeight: 600
                  }}
                >
                  ₹{tx.amount}
                </TableCell>

                <TableCell sx={{ px: 3 }}>
                  {tx.paymentMethod}
                </TableCell>
                  <TableCell sx={{ px: 3 }}>

  <IconButton onClick={(e) => handleMenuOpen(e, tx.id)}>
    <MoreVertIcon />
  </IconButton>

</TableCell>
                

              </TableRow>

            ))}
          </TableBody>
        </Table>
<Menu
  anchorEl={anchorEl}
  open={Boolean(anchorEl)}
  onClose={handleMenuClose}
>

  <MenuItem
    onClick={() => {
     navigate(`/add-expense/${selectedId}`);
      handleMenuClose();
    }}
  >
    <EditIcon sx={{ mr: 1 }} /> Edit
  </MenuItem>

  <MenuItem
    onClick={() => {
      handleDelete(selectedId);
      handleMenuClose();
    }}
  >
    <DeleteIcon sx={{ mr: 1 }} /> Delete
  </MenuItem>

</Menu>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;