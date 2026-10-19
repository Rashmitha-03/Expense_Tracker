import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
   <Box
  sx={{
    minHeight: "100vh",
    width: "100%",
    backgroundImage: "url('/bg_image.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  }}
>
      <Box
        sx={{
          width: "100%",
          maxWidth: "1100px",
          textAlign: "center",
          px: 3,
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{ color: "#1e293b" }}
        >
          💰 Expense Tracker
        </Typography>

        <Typography
          variant="h4"
          sx={{ mt: 4, color: "#1e293b" }}
        >
          Take control of your finances,
          <br />
          start tracking your expenses today.
        </Typography>

        <Typography
          variant="h6"
          sx={{ mt: 2, color: "#475569" }}
        >
          Achieve your financial goals with ease.
        </Typography>

        <Grid container spacing={4} justifyContent="center" sx={{ mt: 6 }}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Paper
              elevation={10}
              sx={{
                p: 4,
                borderRadius: 4,
                color: "white",
                background:
                  "linear-gradient(135deg, #1e3c72, #2a5298)",
                textAlign: "center",
              }}
            >
              <LockIcon sx={{ fontSize: 50 }} />
              <Typography variant="h5" sx={{ mt: 2 }}>
                Login
              </Typography>
              <Button variant="contained" fullWidth sx={{ mt: 3 }}
 onClick={() => navigate("/login")}>
                Login
              </Button>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Paper
              elevation={10}
              sx={{
                p: 4,
                borderRadius: 4,
                color: "white",
                background:
                  "linear-gradient(135deg, #11998e, #38ef7d)",
                textAlign: "center",
              }}
            >
              <PersonIcon sx={{ fontSize: 50 }} />
              <Typography variant="h5" sx={{ mt: 2 }}>
                Register
              </Typography>
              <Button variant="contained" fullWidth sx={{ mt: 3 }}
 onClick={() => navigate("/register")}>
                Register
              </Button>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mt: 6 }}>
          <Box display="flex" justifyContent="center" alignItems="center" mb={1}>
            <CheckCircleIcon color="success" sx={{ mr: 1 }} />
            <Typography sx={{ color: "#1e293b" }}>
              Track your expenses effortlessly
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;