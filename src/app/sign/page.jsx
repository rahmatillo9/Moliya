'use client'
import React, { useState } from "react"
import { Box, TextField, Button, Typography, Container, Avatar, InputAdornment, IconButton, Paper } from "@mui/material"
import { Visibility, VisibilityOff, PhotoCamera } from "@mui/icons-material"
import { styled } from "@mui/system"
import { ThemeProvider, createTheme } from "@mui/material/styles"

// Tema yaratish
const theme = createTheme({
  palette: {
    secondary: {
      main: "#f50057", // Sekundariya rang
    },
  },
})

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(8),
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: 16,
  boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .1)",
}))

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(12),
  height: theme.spacing(12),
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.secondary?.main || "#f50057", // Standart rang bilan
  cursor: "pointer",
}))

const StyledForm = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(3),
}))

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
  borderRadius: 20,
  padding: theme.spacing(1, 4),
}))

function SignUpForm() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    profile_image: null,
    role: "user",
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prevState) => ({
        ...prevState,
        profile_image: file,
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log(formData)
  }

  return (
    <Container component="main" maxWidth="xs">
      <StyledPaper elevation={6}>
        <Typography component="h1" variant="h5" gutterBottom>
          Sign Up
        </Typography>
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="profile-image-upload"
          type="file"
          onChange={handleImageChange}
        />
        <label htmlFor="profile-image-upload">
        <StyledAvatar>
  {formData.profile_image ? (
    typeof window !== "undefined" ? (
      <img
        src={URL.createObjectURL(formData.profile_image)}
        alt="Profile"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    ) : null
  ) : (
    <PhotoCamera />
  )}
</StyledAvatar>

        </label>
        <StyledForm onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="fullname"
            label="Full Name"
            name="fullname"
            autoComplete="name"
            value={formData.fullname}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Phone Number"
            name="phone"
            autoComplete="tel"
            value={formData.phone}
            onChange={handleChange}
          />
          <StyledButton type="submit" fullWidth variant="contained" color="primary">
            Sign Up
          </StyledButton>
        </StyledForm>
      </StyledPaper>
    </Container>
  )
}

// `ThemeProvider` bilan qoplash
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SignUpForm />
    </ThemeProvider>
  )
}
