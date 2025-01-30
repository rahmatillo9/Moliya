import { useState, useEffect } from "react";
import { Container, Typography, Grid } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import TransactionsTable from "@/components/TransactionsTable";
import MonthlyReport from "@/components/MonthlyReport";
import WeeklyReport from "@/components/WeeklyReport";
import YearlyReport from "@/components/YearlyReport";

export default function Home() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log("token", token);
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded token:", decodedToken);
        setUserId(decodedToken.id || decodedToken.sub);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

    
  console.log("userId:", userId);

  if (!userId) return <Typography>Iltimos, tranzaksiyalarni ko'rish uchun tizimga kiring.</Typography>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Tranzaksiyalar Boshqaruv Paneli
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <MonthlyReport userId={userId} />
        </Grid>
        <Grid item xs={12} md={4}>
          <WeeklyReport userId={userId} />
        </Grid>
        <Grid item xs={12} md={4}>
          <YearlyReport userId={userId} />
        </Grid>
        <Grid item xs={12}>
          <TransactionsTable userId={userId} />
        </Grid>
      </Grid>
    </Container>
  );
}
