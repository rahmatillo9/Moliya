"use client"

import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Box, Avatar, Typography, MenuList, MenuItem, ListItemIcon, ListItemText, Divider, Menu } from "@mui/material"

function AccountSidebarFooter() {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken")

      if (!token) {
        console.error("No token found")
        setError("No authentication token found")
        return
      }

      try {
        const decodedToken = jwtDecode(token)
        console.log("Decoded token:", decodedToken)

        const userId = decodedToken.id || decodedToken.sub

        if (!userId) {
          console.error("No user ID found in token")
          setError("Invalid token: No user ID found")
          return
        }

        console.log("Fetching user data for ID:", userId)

        const response = await axios.get(`http://localhost:4000/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        console.log("Decoded token:", decodedToken)
        console.log("Fetching user data for ID:", userId)
        console.log("response:", response)
        
        setUser(response.data)
      } catch (error) {
        console.error("Error fetching user data:", error)
        if (axios.isAxiosError(error)) {
          console.error("Response status:", error.response?.status)
          console.error("Response data:", error.response?.data)
          if (error.response?.status === 403) {
            setError("Access forbidden. You may not have the necessary permissions.")
          } else {
            setError(`Error: ${error.message}`)
          }
        } else {
          setError("An unexpected error occurred")
        }
      }
    }

    fetchUserData()
  }, []) // Removed unnecessary dependency: router

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleProfileClick = () => {
    alert("Navigating to Profile...")
    handleCloseUserMenu()
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!user) return <div>Loading...</div>

  // Concatenate base URL to the profile image
  const profileImageUrl = user.profile_image ? `http://localhost:4000${user.profile_image}` : ""

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="body2" color="text.secondary" mb={1}>
        Account
      </Typography>
      <MenuList>
        <MenuItem key={user.id} sx={{ gap: 1 }} onClick={handleOpenUserMenu}>
          <ListItemIcon>
            <Avatar sx={{ bgcolor: "primary.main" }} src={profileImageUrl} alt={user.fullname}>
              {user.fullname.charAt(0)}
            </Avatar>
          </ListItemIcon>
          <ListItemText primary={user.fullname} secondary={user.email} />
        </MenuItem>
      </MenuList>
      <Divider sx={{ my: 1 }} />
      <MenuItem onClick={() => router.push("/")}>Sign Out</MenuItem>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={() => router.push('/updateP')}>Edit Profile</MenuItem>
      </Menu>
    </Box>
  )
}

export default AccountSidebarFooter
