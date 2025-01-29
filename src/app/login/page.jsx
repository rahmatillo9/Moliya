'use client'
import React, { useState } from "react";
import axios from "axios";
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
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter(); // useRouter hook'ini komponentning yuqori qismida chaqirish

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Xatolarni tozalash

    try {
      const response = await axios.post("http://localhost:4000/users/login", {
        email,
        password,
      });

      // Agar so'rov muvaffaqiyatli bo'lsa
      console.log("Login successful:", response.data);
      // Tokenni saqlash (login paytida)
     localStorage.setItem("authToken", response.data.accessToken);

      alert("Login successful!");
      router.push("/dashobar");

      // Agar "Remember me" belgilangan bo'lsa, ma'lumotlarni saqlash
      if (rememberMe) {
        localStorage.setItem("userEmail", email);
      } else {
        localStorage.removeItem("userEmail");
      }

      // Qo'shimcha amallar (masalan, foydalanuvchini boshqa sahifaga yo'naltirish)
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
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
          control={
            <Checkbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
          }
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