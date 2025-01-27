"use client"

import { useState } from "react"
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material"
import { BarChart } from "lucide-react"
import { formatDate, formatSum } from "@/utils/formatters"
import { AnalyticsChart } from "@/components/AnalyticsChart"

const transactions = {
  today: [
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
  ],
  yesterday: [
    {
      id: 3,
      description: "To'lov: YATOT OXUNOV OBLOBERDI VO",
      amount: -11000,
      timestamp: "2025-01-22T19:22:00",
    },
    {
      id: 4,
      description: "To'lov: CLICK P2P HUMO2HUMO",
      amount: -5040,
      timestamp: "2025-01-22T19:12:00",
    },
    {
      id: 5,
      description: "To'lov: SHODLIK NON UYI OILAVIY KOR",
      amount: -29000,
      timestamp: "2025-01-22T18:43:00",
    },
    {
      id: 6,
      description: "To'lov: BRB P2P HUMODAN UZCARDGA",
      amount: -3500000,
      timestamp: "2025-01-22T15:49:00",
    },
    {
      id: 7,
      description: "Daromad: XAZNA P2P",
      amount: 3430000,
      timestamp: "2025-01-22T15:25:00",
    },
  ],
}

const totalIncome = 7198664.9
const totalOutcome = -6753215.0

export default function MonitoringPage() {
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const filterTransactions = (transactions, type) => {
    if (type === "income") {
      return {
        today: transactions.today.filter((t) => t.amount > 0),
        yesterday: transactions.yesterday.filter((t) => t.amount > 0),
      }
    }
    if (type === "outcome") {
      return {
        today: transactions.today.filter((t) => t.amount < 0),
        yesterday: transactions.yesterday.filter((t) => t.amount < 0),
      }
    }
    return transactions
  }

  const filteredTransactions = filterTransactions(
    transactions,
    tabValue === 1 ? "income" : tabValue === 2 ? "outcome" : "all",
  )

  return (
    <div className="max-w-screen-xl mx-auto bg-gray-50 min-h-screen">
      <Box className="px-6 py-4 flex items-center justify-between">
        <Typography variant="h5" component="h1">
          Monitoring
        </Typography>
        <BarChart className="w-7 h-7 text-gray-600" />
      </Box>

      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        className="px-6"
        TabIndicatorProps={{
          style: {
            backgroundColor: "#ef4444",
          },
        }}
      >
        <Tab label={<span className={tabValue === 0 ? "text-red-500" : ""}>All</span>} className="min-w-0" />
        <Tab label={<span className={tabValue === 1 ? "text-red-500" : ""}>Income</span>} className="min-w-0" />
        <Tab label={<span className={tabValue === 2 ? "text-red-500" : ""}>Outcome</span>} className="min-w-0" />
      </Tabs>

      <Box className="p-6">
        <Paper className="p-6 mb-6">
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Period
          </Typography>
          <Typography variant="h6" gutterBottom>
            01.01.2025 - 23.01.2025
          </Typography>

          <div className="flex justify-between mt-6">
            <div>
              <Typography variant="body2" color="text.secondary">
                Income
              </Typography>
              <Typography variant="h6" className="text-green-500">
                +{formatSum(totalIncome)} sum
              </Typography>
            </div>
            <div>
              <Typography variant="body2" color="text.secondary">
                Outcome
              </Typography>
              <Typography variant="h6" className="text-red-500">
                -{formatSum(totalOutcome)} sum
              </Typography>
            </div>
          </div>
        </Paper>

        {/* Add AnalyticsChart Component here */}
        <Paper className="p-6 mb-6">
          <Typography variant="h6" gutterBottom>
            Analytics (Views & Downloads)
          </Typography>
          <AnalyticsChart /> {/* This renders the chart */}
        </Paper>

        <TableContainer component={Paper} className="rounded-lg">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
  {Object.entries(filteredTransactions).map(([day, items]) => (
    items.map((transaction) => (
      <TableRow key={transaction.id}>
        <TableCell>{formatDate(transaction.timestamp)}</TableCell>
        <TableCell>{transaction.description}</TableCell>
        <TableCell
          align="right"
          className={transaction.amount > 0 ? "text-green-500" : "text-red-500"}
        >
          {transaction.amount > 0 ? "+" : ""} {formatSum(transaction.amount)} sum
        </TableCell>
      </TableRow>
    ))
  ))}
</TableBody>

          </Table>
        </TableContainer>
      </Box>
    </div>
  )
}
