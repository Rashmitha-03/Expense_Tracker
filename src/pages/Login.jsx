import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import Dashboard from "../pages/Dashboard";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await loginUser(formData);

      const { token, id, name, email } = response.data;

      // ✅ Store token
      localStorage.setItem("token", token);

      // ✅ Store user info
      localStorage.setItem(
        "user",
        JSON.stringify({ id, name, email })
      );

      // ✅ Redirect to dashboard
      navigate("/Dashboard");

    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid email or password"
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #dfe9f3, #ffffff)",
      }}
    >
      <Card sx={{ width: 350, p: 2, borderRadius: 3, boxShadow: 5 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Login
          </Typography>

          <TextField
            label="Email"
            type="email"
            name="email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
          />

          <TextField
            label="Password"
            type="password"
            name="password"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
          />

          <FormControlLabel
            control={<Checkbox />}
            label="Remember me"
          />

          {error && (
            <Typography color="error" variant="body2" mt={1}>
              {error}
            </Typography>
          )}

          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              bgcolor: "#2563eb",
              "&:hover": { bgcolor: "#1d4ed8" },
            }}
            onClick={handleSubmit}
          >
            Login
          </Button>

          <Typography mt={2} variant="body2">
            Don't have an account?{" "}
            <Link
              component="button"
              onClick={() => navigate("/register")}
            >
              Register
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;