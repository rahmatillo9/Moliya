"use client";
import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Menu from "@mui/material/Menu";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import CalendarPage from "@/components/calendar";
import ExpenseForm from "@/components/Create";
import MonitoringPage from "@/components/monitoring";
import { useRouter } from "next/navigation";

const NAVIGATION = [
  {
    segment: "dashboard",
    title: "Create",
    icon: <AddBoxIcon />,
  },
  {
    segment: "calendar",
    title: "Calendar",
    icon: <CalendarMonthIcon />,
  },
  {
    segment: "monitoring",
    title: "Monitoring",
    icon: <VisibilityIcon />,
  },
];

const demoTheme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#ff4081" },
    error: { main: "#d32f2f" },
    success: { main: "#388e3c" },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1200,
      xl: 1536,
    },
  },
});

const accounts = [
  {
    id: 1,
    name: "Bharat Kashyap",
    email: "bharatkashyap@outlook.com",
    image: "https://avatars.githubusercontent.com/u/19550456",
  },
];

function AccountSidebarFooter() {
    const router = useRouter()
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleProfileClick = () => {
    alert("Navigating to Profile...");
    handleCloseUserMenu();
  };



  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="body2" color="text.secondary" mb={1}>
        Account
      </Typography>
      <MenuList>
        {accounts.map((account) => (
          <MenuItem key={account.id} sx={{ gap: 1 }} onClick={handleOpenUserMenu}>
            <ListItemIcon>
              <Avatar
                sx={{ bgcolor: account.color || "primary.main" }}
                src={account.image || ""}
                alt={account.name}
              >
                {account.name[0]}
              </Avatar>
            </ListItemIcon>
            <ListItemText primary={account.name} secondary={account.email} />
          </MenuItem>
        ))}
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
  );
}

function DemoPageContent({ pathname }) {
  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {pathname === "/calendar" && <CalendarPage />}
      {pathname === "/monitoring" && <MonitoringPage />}
      {pathname === "/dashboard" && <ExpenseForm/>}
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function DashboardLayoutBranding(props) {
  const { window } = props;
  const router = useDemoRouter("/dashboard");
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <img src="/Moliya.png" alt="SOMNY" />,
        title: "SOMNY",
        homeUrl: "/toolpad/core/introduction",
      }}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout
        slots={{
          sidebarFooter: AccountSidebarFooter,
        }}
      >
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutBranding.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutBranding;
