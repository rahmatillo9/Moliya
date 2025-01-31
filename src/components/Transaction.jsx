"use client"

import { useEffect, useState } from "react"
import jsPDF from "jspdf"
import "jspdf-autotable"
import axios from "axios"
import {jwtDecode} from "jwt-decode"

export default function TransactionReport() {
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

  const generatePDF = () => {
    const doc = new jsPDF()
    doc.text("Oylik Kirim-Chiqim Hisoboti", 14, 10)

    const tableColumn = ["Sana", "Kirim", "Chiqim", "Izoh"]
    const tableRows = []

    transactions.forEach((item) => {
      const date = new Date(item.date).toLocaleDateString("uz-UZ")
      const amount = item.amount.toLocaleString("uz-UZ")
      const rowData = [
        date,
        item.type === "income" ? amount : "",
        item.type === "expense" ? amount : "",
        item.description,
      ]
      tableRows.push(rowData)
    })

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    })

    doc.save("hisobot.pdf")
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div>
      <button
        onClick={generatePDF}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
        disabled={transactions.length === 0}
      >
        PDF yuklab olish
      </button>
      {transactions.length === 0 && !error && <p className="mt-4 text-gray-600">Ma'lumotlar yuklanmoqda...</p>}
    </div>
  )
}

