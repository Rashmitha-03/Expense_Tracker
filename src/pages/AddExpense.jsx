import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem
} from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";

import {
  addExpense,
  getExpenseById,
  updateExpense
} from "../services/expenseService";

const categories = [
  "Food",
  "Travel",
  "Shopping",
  "Bills",
  "Entertainment"
];

const paymentMethods = [
  "Cash",
  "UPI",
  "Card",
  "Bank Transfer"
];

const AddExpense = () => {

  const navigate = useNavigate();
  const { id } = useParams();   // detect edit mode

  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    category: "",
    payment: "",
    expenseDate: ""
  });

  const handleChange = (e) => {
    setExpense({
      ...expense,
      [e.target.name]: e.target.value
    });
  };

  // Load existing expense if editing
  useEffect(() => {

    if (!id) return;

    const fetchExpense = async () => {
      try {

        const response = await getExpenseById(id);
        const data = response.data;

        setExpense({
          title: data.title || "",
          amount: data.amount || "",
          category: data.category || "",
          payment: data.paymentMethod || "",
          expenseDate: data.expenseDate || ""
        });

      } catch (error) {
        console.error("Error fetching expense", error);
      }
    };

    fetchExpense();

  }, [id]);

  const handleSubmit = async () => {

    if (
      !expense.title ||
      !expense.amount ||
      !expense.category ||
      !expense.payment ||
      !expense.expenseDate
    ) {
      alert("Please fill all fields");
      return;
    }

    try {

      const payload = {
        title: expense.title,
        amount: Number(expense.amount),
        category: expense.category,
        paymentMethod: expense.payment,
        expenseDate: expense.expenseDate
      };

      if (id) {

        await updateExpense(id, payload);
        alert("Expense updated successfully");

      } else {

        await addExpense(payload);
        alert("Expense added successfully");

      }

      navigate("/dashboard");

    } catch (error) {

      console.error(error);
      alert("Operation failed");

    }

  };

  return (
    <Box
      sx={{
        p: 4,
        display: "flex",
        justifyContent: "center"
      }}
    >

      <Card sx={{ width: 500, borderRadius: 3, boxShadow: 3 }}>

        <CardContent>

          <Typography variant="h5" fontWeight="bold" mb={3}>
            {id ? "Edit Expense" : "Add Expense"}
          </Typography>

          <TextField
            label="Title"
            name="title"
            fullWidth
            margin="normal"
            value={expense.title}
            onChange={handleChange}
          />

          <TextField
            label="Amount"
            name="amount"
            type="number"
            fullWidth
            margin="normal"
            value={expense.amount}
            onChange={handleChange}
          />

          <TextField
            select
            label="Category"
            name="category"
            fullWidth
            margin="normal"
            value={expense.category}
            onChange={handleChange}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Payment Method"
            name="payment"
            fullWidth
            margin="normal"
            value={expense.payment}
            onChange={handleChange}
          >
            {paymentMethods.map((method) => (
              <MenuItem key={method} value={method}>
                {method}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            type="date"
            name="expenseDate"
            fullWidth
            margin="normal"
            value={expense.expenseDate}
            onChange={handleChange}
          />

          <Box sx={{ display: "flex", gap: 2, mt: 3 }}>

            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                bgcolor: "#2563eb",
                "&:hover": { bgcolor: "#1d4ed8" }
              }}
            >
              {id ? "Update Expense" : "Save Expense"}
            </Button>

            <Button
              variant="outlined"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </Button>

          </Box>

        </CardContent>

      </Card>

    </Box>
  );
};

export default AddExpense;