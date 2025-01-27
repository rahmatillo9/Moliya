import { createTheme } from "@mui/material/styles";

const demoTheme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Asosiy (primary) rang
    },
    secondary: {
      main: "#f50057", // Ikkinchi darajali (secondary) rang
    },
    background: {
      default: "#f4f6f8", // Umumiy fon rangi
      paper: "#ffffff", // Karta yoki panel fon rangi
    },
    text: {
      primary: "#212121", // Asosiy matn rangi
      secondary: "#757575", // Ikkinchi darajali matn rangi
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif", // Shriftni sozlash
    h1: {
      fontSize: "2rem", // H1 sarlavha o'lchami
      fontWeight: 600,
    },
  },
});
