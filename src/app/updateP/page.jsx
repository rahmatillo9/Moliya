"use client"

import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Box, TextField, Button, Avatar, Typography, Grid } from "@mui/material"

export default function EditProfilePage() {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [profileData, setProfileData] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    profile_image: "",
  })
  const [image, setImage] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken")

      if (!token) {
        setError("No authentication token found")
        return
      }

      try {
        const decodedToken = jwtDecode(token)
        const userId = decodedToken.id || decodedToken.sub

        if (!userId) {
          setError("Invalid token: No user ID found")
          return
        }

        const response = await axios.get(`http://localhost:4000/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        setUser(response.data)
        setProfileData(response.data) // Initialize the form with user data
      } catch (error) {
        setError("Error fetching user data")
      }
    }


    fetchUserData()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("fullname", profileData.fullname)
    formData.append("email", profileData.email)
    formData.append("phone", profileData.phone)
    formData.append("password", profileData.password)

    if (image) {
      formData.append("profile_image", image)
    }

    const token = localStorage.getItem("authToken")
    const decodedToken = jwtDecode(token)
    const userId = decodedToken.id || decodedToken.sub

    try {
      await axios.put(`http://localhost:4000/users/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      router.push("/dashobar") // Redirect to the profile page after successful update
    } catch (error) {
      setError("Error updating profile")
    }
  }

  if (error) return <div>{error}</div>
  if (!user) return <div>Loading...</div>

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 2 }}>
      <Typography variant="h4" mb={2}>
        Edit Profile
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} textAlign="center">
        <Avatar
  src={`http://localhost:4000${profileData.profile_image || ""}`} 
  alt={profileData.fullname}
  sx={{ width: 100, height: 100, marginBottom: 2 }}
/>
          <Button variant="contained" component="label">
            Upload Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </Button>
        </Grid>
        
         
        <Grid item xs={12}>
          <TextField
            label="Full Name"
            fullWidth
            name="fullname"
            value={profileData.fullname}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Email"
            fullWidth
            name="email"
            value={profileData.email}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Phone"
            fullWidth
            name="phone"
            value={profileData.phone}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Password"
            fullWidth
            name="password"
            value={profileData.password}
            onChange={handleInputChange}
            type="password"
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" fullWidth onClick={handleSubmit}>
            Save Changes
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
