"use client";

import { useState } from "react";
import { Box, Typography, Paper, List, ListItem, ListItemText } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const transactions = [
  {
    id: 1,
    description: "To'lov: YATOT OXUNOV OBLOBERDI VO",
    amount: -15000,
    timestamp: "2025-01-23T18:05:00",
  },
  {
    id: 2,
    description: "To'lov: CLICK P2P HUMO2HUMO",
    amount: -10080,
    timestamp: "2025-01-23T12:16:00",
  },
  {
    id: 3,
    description: "To'lov: SHODLIK NON UYI OILAVIY KOR",
    amount: -29000,
    timestamp: "2025-01-24T18:43:00",
  },
  {
    id: 4,
    description: "To'lov: XAZNA P2P",
    amount: 3430000,
    timestamp: "2025-01-24T15:25:00",
  },
  {
    id: 5,
    description: "To'lov: BRB P2P HUMODAN UZCARDGA",
    amount: -3500000,
    timestamp: "2025-01-25T15:49:00",
  },
];

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  // Sanaga mos keladigan tranzaksiyalarni olish uchun filter
  const getTransactionsForDate = (date) => {
    return transactions.filter(
      (transaction) => dayjs(transaction.timestamp).format("YYYY-MM-DD") === date.format("YYYY-MM-DD")
    );
  };

  const dailyTransactions = getTransactionsForDate(selectedDate);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="max-w-4xl mx-auto bg-gray-50 min-h-screen p-4">
        <Box className="flex flex-col md:flex-row gap-4">
          {/* Kalendar qismi */}
          <Paper className="p-4 flex-grow">
            <Typography variant="h6" gutterBottom>
              Calendar
            </Typography>
            <DateCalendar
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
            />
          </Paper>

          {/* Sanaga mos tranzaksiyalar */}
          <Paper className="p-4 flex-grow">
            <Typography variant="h6" gutterBottom>
              Transactions on {selectedDate.format("YYYY-MM-DD")}
            </Typography>
            {dailyTransactions.length > 0 ? (
              <List>
                {dailyTransactions.map((transaction) => (
                  <ListItem key={transaction.id} className="flex justify-between">
                    <ListItemText
                      primary={transaction.description}
                      secondary={`Time: ${dayjs(transaction.timestamp).format("HH:mm")}`}
                    />
                    <Typography
                      variant="body1"
                      className={transaction.amount > 0 ? "text-green-500" : "text-red-500"}
                    >
                      {transaction.amount > 0 ? "+" : ""}
                      {transaction.amount.toLocaleString()} sum
                    </Typography>
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body1" color="text.secondary">
                No transactions for this day.
              </Typography>
            )}
          </Paper>
        </Box>
      </div>
    </LocalizationProvider>
  );
}
