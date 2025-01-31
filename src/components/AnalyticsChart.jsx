"use client"

import { useEffect, useState } from "react"
import { Line, Doughnut } from "react-chartjs-2"
import axios from "axios"
import {jwtDecode} from "jwt-decode"
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js"

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, ArcElement)

export default function TransactionDashboard() {
  const [transactions, setTransactions] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem("authToken")

      if (!token) {
        setError("No authentication token found")
        return
      }

      try {
        const decodedToken = jwtDecode(token)
        const userId = decodedToken.id || decodedToken.sub

        if (!userId) {
          setError("Invalid token: No user ID found")
          return
        }

        const response = await axios.get(`http://localhost:4000/transactions/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setTransactions(response.data)
      } catch (error) {
        console.error("Error fetching transaction data:", error)
        setError("An error occurred while fetching transaction data")
      }
    }

    fetchTransactions()
  }, [])

  const processTransactions = () => {
    const monthNames = [
      "Yanvar",
      "Fevral",
      "Mart",
      "Aprel",
      "May",
      "Iyun",
      "Iyul",
      "Avgust",
      "Sentyabr",
      "Oktyabr",
      "Noyabr",
      "Dekabr",
    ]
    const monthlyData = {}

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date)
      const monthYear = `${monthNames[date.getMonth()]} ${date.getFullYear()}`

      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = { income: 0, expense: 0 }
      }

      if (transaction.type === "income") {
        monthlyData[monthYear].income += transaction.amount
      } else if (transaction.type === "expense") {
        monthlyData[monthYear].expense += transaction.amount
      }
    })

    return Object.entries(monthlyData).sort((a, b) => {
      const [monthA, yearA] = a[0].split(" ")
      const [monthB, yearB] = b[0].split(" ")
      return new Date(yearA, monthNames.indexOf(monthA)) - new Date(yearB, monthNames.indexOf(monthB))
    })
  }

  const chartData = processTransactions()

  const lineData = {
    labels: chartData.map(([month]) => month),
    datasets: [
      {
        label: "Kirim",
        data: chartData.map(([, data]) => data.income),
        borderColor: "green",
        backgroundColor: "rgba(0, 255, 0, 0.2)",
        tension: 0.4,
      },
      {
        label: "Chiqim",
        data: chartData.map(([, data]) => data.expense),
        borderColor: "red",
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        tension: 0.4,
      },
    ],
  }

  const doughnutOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.raw.toLocaleString("uz-UZ")
            return `${tooltipItem.label}: ${value} so'm`
          },
        },
      },
      legend: {
        display: true,
        position: "top",
      },
    },
  }

  const doughnutDataKirim = {
    labels: chartData.map(([month]) => month),
    datasets: [
      {
        label: "Kirim",
        data: chartData.map(([, data]) => data.income),
        backgroundColor: [
          "#4caf50",
          "#8bc34a",
          "#cddc39",
          "#ffeb3b",
          "#ffc107",
          "#ff9800",
          "#f44336",
          "#e91e63",
          "#9c27b0",
          "#673ab7",
          "#3f51b5",
          "#2196f3",
        ],
      },
    ],
  }

  const doughnutDataChiqim = {
    labels: chartData.map(([month]) => month),
    datasets: [
      {
        label: "Chiqim",
        data: chartData.map(([, data]) => data.expense),
        backgroundColor: [
          "#f44336",
          "#e91e63",
          "#9c27b0",
          "#673ab7",
          "#3f51b5",
          "#2196f3",
          "#4caf50",
          "#8bc34a",
          "#cddc39",
          "#ffeb3b",
          "#ffc107",
          "#ff9800",
        ],
      },
    ],
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (


    <div className="w-full max-w-4xl mx-auto p-6">
      
      <h2 className="text-2xl font-bold mb-4">Biznes Kirim-Chiqim Diagrammasi</h2>
      <div className="mb-8">
        <Line data={lineData} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Kirim bo'yicha taqsimot</h2>
          <Doughnut data={doughnutDataKirim} options={doughnutOptions} />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Chiqim bo'yicha taqsimot</h2>
          <Doughnut data={doughnutDataChiqim} options={doughnutOptions} />
        </div>
      </div>
      
    </div>
  )
}

