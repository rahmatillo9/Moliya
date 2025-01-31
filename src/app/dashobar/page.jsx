"use client";
import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { createTheme } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import ExpenseForm from "@/components/Create";
import AccountSidebarFooter from "@/components/accoun";
import Home from "@/pages/index2";
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import Analistika from "@/components/AnalyticsChart";
const NAVIGATION = [

  {
    segment: "diagrama",
    title: "Analistika",
    icon: <AutoGraphIcon />,
  },



  {
    segment: "monitoring",
    title: "Monitoring",
    icon: <VisibilityIcon />,
  },

  {
    segment: "dashboard",
    title: "Create",
    icon: <AddBoxIcon />,
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
      {pathname === "/diagrama" && <Analistika />}
      {pathname === "/monitoring" && <Home />}
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
