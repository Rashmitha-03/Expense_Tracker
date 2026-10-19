import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  InputAdornment,
  LinearProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "age") {
      const ageValue = Math.max(0, Number(value));
      setFormData({ ...formData, [name]: ageValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Password Strength Logic
  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

  const isStrongPassword =
    formData.password.length >= 8 &&
    /[A-Z]/.test(formData.password) &&
    /[0-9]/.test(formData.password) &&
    /[^A-Za-z0-9]/.test(formData.password);

  const isFormValid =
    formData.name &&
    formData.age !== "" &&
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    isValidEmail &&
    isStrongPassword &&
    formData.password === formData.confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!isFormValid) return;

    try {
      const userPayload = {
        name: formData.name,
        age: formData.age,
        email: formData.email,
        password: formData.password,
      };

      await registerUser(userPayload);

      setApiSuccess("Registration successful! Redirecting to login...");
      setApiError("");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setApiError(
        error.response?.data?.message || "Registration failed"
      );
      setApiSuccess("");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#eae5e5",
      }}
    >
      <Paper elevation={10} sx={{ p: 4, width: 400, borderRadius: 4 }}>
        <Typography variant="h4" textAlign="center" mb={3}>
          Register
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <TextField
            fullWidth
            label="Name"
            name="name"
            margin="normal"
            value={formData.name}
            onChange={handleChange}
            error={submitted && !formData.name}
            helperText={submitted && !formData.name ? "Name is required" : ""}
          />

          {/* Age */}
          <TextField
            fullWidth
            label="Age"
            name="age"
            type="number"
            margin="normal"
            inputProps={{ min: 0 }}
            value={formData.age}
            onChange={handleChange}
            error={submitted && formData.age === ""}
            helperText={
              submitted && formData.age === "" ? "Age is required" : ""
            }
          />

          {/* Email */}
          <TextField
            fullWidth
            label="Email"
            name="email"
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            error={submitted && !isValidEmail}
            helperText={
              submitted && !isValidEmail
                ? "Enter a valid email address"
                : ""
            }
          />

          {/* Password */}
          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            error={submitted && !isStrongPassword}
            helperText={
              submitted && !isStrongPassword
                ? "Min 8 chars, 1 uppercase, 1 number, 1 special char"
                : ""
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Password Strength */}
          {formData.password.length > 0 && !isStrongPassword && (
            <LinearProgress
              variant="determinate"
              value={passwordStrength}
              sx={{ height: 8, borderRadius: 5, mt: 1 }}
            />
          )}

          {/* Confirm Password */}
          <TextField
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            margin="normal"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={
              submitted &&
              formData.password !== formData.confirmPassword
            }
            helperText={
              submitted &&
              formData.password !== formData.confirmPassword
                ? "Passwords do not match"
                : ""
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setShowConfirmPassword((prev) => !prev)
                    }
                    edge="end"
                  >
                    {showConfirmPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* API Messages */}
          {apiError && (
            <Typography color="error" mt={1}>
              {apiError}
            </Typography>
          )}

          {apiSuccess && (
            <Typography color="success.main" mt={1}>
              {apiSuccess}
            </Typography>
          )}

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 3 }}
            disabled={!isFormValid}
          >
            Register
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default Register;