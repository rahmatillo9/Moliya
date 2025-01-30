'use client'
import { useState, useEffect } from "react"
import { Typography, Paper } from "@mui/material"

const YearlyReport = ({ userId }) => {
  const [report, setReport] = useState(null)

  useEffect(() => {
    const fetchYearlyReport = async () => {
      try {
        const response = await fetch(`http://localhost:4000/transactions/yearly-report/${userId}`)
        const data = await response.json()
        setReport(data)
      } catch (error) {
        console.error("Yillik hisobotni olishda xatolik:", error)
      }
    }

    fetchYearlyReport()
  }, [userId])

  if (!report) return <Typography>Yillik hisobot yuklanmoqda...</Typography>

  return (
    <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Yillik Hisobot
      </Typography>
      <Typography>Jami kirim: ${report.totalIncome}</Typography>
      <Typography>Jami chiqim: ${report.totalExpenses}</Typography>
      <Typography>Sof foyda: ${report.net}</Typography>
    </Paper>
  )
}

export default YearlyReport
