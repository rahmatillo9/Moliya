'use client'
import { useState, useEffect } from "react"
import { Typography, Paper } from "@mui/material"

const WeeklyReport = ({ userId }) => {
  const [report, setReport] = useState(null)

  useEffect(() => {
    const fetchWeeklyReport = async () => {
      try {
        const response = await fetch(`http://localhost:4000/transactions/weekly-report/${userId}`)
        const data = await response.json()
        setReport(data)
      } catch (error) {
        console.error("Haftalik hisobotni olishda xatolik:", error)
      }
    }

    fetchWeeklyReport()
  }, [userId])

  if (!report) return <Typography>Haftalik hisobot yuklanmoqda...</Typography>

  return (
    <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Haftalik Hisobot
      </Typography>
      <Typography>Jami kirim: ${report.totalIncome}</Typography>
      <Typography>Jami chiqim: ${report.totalExpenses}</Typography>
      <Typography>Sof foyda: ${report.net}</Typography>
    </Paper>
  )
}

export default WeeklyReport
