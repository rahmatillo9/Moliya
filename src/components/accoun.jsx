"use client"

import { useEffect, useState } from "react"
import {jwtDecode} from "jwt-decode"
import { useRouter } from "next/navigation"
import { Box, Avatar, Typography, MenuList, MenuItem, ListItemIcon, ListItemText, Divider, Menu } from "@mui/material"

function AccountSidebarFooter() {
  const [user, setUser] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const fetchUserData = () => {
      const token = localStorage.getItem("authToken")

      if (!token) {
        console.error("No token found")
        return
      }

      try {
        const decodedToken = jwtDecode(token)
        console.log("Decoded token:", decodedToken)

        // Token ma'lumotlarini tekshirish va standart qiymatlar bilan to'ldirish
        const userData = {
          id: decodedToken.id || "default_id",
          fullname: decodedToken.fullname || "Unknown User",
          email: decodedToken.email || "No email provided",
          profile_image: decodedToken.profile_image || "",
        }

        setUser(userData)
      } catch (error) {
        console.error("Error decoding token:", error)
      }
    }

    fetchUserData()
  }, [])

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

  if (!user) return <div>Loading...</div>

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="body2" color="text.secondary" mb={1}>
        Account
      </Typography>
      <MenuList>
        <MenuItem key={user.id} sx={{ gap: 1 }} onClick={handleOpenUserMenu}>
          <ListItemIcon>
            <Avatar sx={{ bgcolor: "primary.main" }} src={user.profile_image} alt={user.fullname}>
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
        <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
        <MenuItem onClick={() => alert("Editing Profile...")}>Edit Profile</MenuItem>
      </Menu>
    </Box>
  )
}

export default AccountSidebarFooter

