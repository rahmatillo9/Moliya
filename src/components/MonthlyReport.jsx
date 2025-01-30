'use client'
import { useState, useEffect } from "react"
import { Typography, Paper } from "@mui/material"

const MonthlyReport = ({ userId }) => {
  const [report, setReport] = useState(null)

  useEffect(() => {
    const fetchMonthlyReport = async () => {
      try {
        const response = await fetch(`http://localhost:4000/transactions/monthly-report/${userId}`)
        const data = await response.json()
        setReport(data)
      } catch (error) {
        console.error("Oylik hisobotni olishda xatolik:", error)
      }
    }

    fetchMonthlyReport()
  }, [userId])

  if (!report) return <Typography>Oylik hisobot yuklanmoqda...</Typography>

  return (
    <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Oylik Hisobot
      </Typography>
      <Typography>Jami kirim: ${report.totalIncome}</Typography>
      <Typography>Jami chiqim: ${report.totalExpenses}</Typography>
      <Typography>Sof foyda: ${report.net}</Typography>
    </Paper>
  )
}

export default MonthlyReport
