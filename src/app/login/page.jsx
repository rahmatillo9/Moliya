'use client'
import React, { useState } from "react";
import {jwtDecode} from "jwt-decode"; 
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
  Alert,
} from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);






  return (
    <Container maxWidth="sm" sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <Box
        component="form"
        sx={{
          width: "100%",
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: "white",
        }}
      >
        <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
          Login
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          required
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Remember me"
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3, py: 1.5 }}
        >
          Log In
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
