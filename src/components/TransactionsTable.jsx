'use client'
import { useState, useEffect } from "react"
import axios from "axios"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material"
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material"

const TransactionsTable = ({ userId }) => {
  const [transactions, setTransactions] = useState([])
  const [open, setOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState(null)
  const [selectedType, setSelectedType] = useState("expense") // type uchun state

  useEffect(() => {
    if (userId) {
      fetchTransactions()
    }
  }, [userId])

  const fetchTransactions = async () => {
    try {
      const { data } = await axios.get(`http://localhost:4000/transactions/user/${userId}`)
      console.log("Tranzaksiyalar:", data)
      setTransactions(data)
    } catch (error) {
      console.error("Tranzaksiyalarni olishda xatolik:", error)
    }
  }

  const handleOpen = (transaction) => {
    setEditingTransaction(transaction)
    setSelectedType(transaction.type) // tahrir qilishda type ni to'g'rilash
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setEditingTransaction(null)
    setSelectedType("expense") // Dialogni yopishda default qiymatni qaytarish
  }

  const handleSave = async (event) => {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    const transactionData = {
      description: formData.get("description"),
      amount: parseFloat(formData.get("amount")),
      date: new Date(formData.get("date")).toISOString(),
      type: selectedType, // selectedType ni qo'shish
      userId,
    }

    try {
      if (editingTransaction) {
        await axios.put(`http://localhost:4000/transactions/${editingTransaction.id}`, transactionData)
      } else {
        await axios.post("http://localhost:4000/transactions", transactionData)
      }

      handleClose()
      fetchTransactions()
    } catch (error) {
      console.error("Saqlashda xatolik:", error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/transactions/${id}`)
      fetchTransactions()
    } catch (error) {
      console.error("O‘chirishda xatolik:", error)
    }
  }

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value) // Type ni yangilash
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="tranzaksiyalar jadvali">
          <TableHead>
            <TableRow>
              <TableCell>Sana</TableCell>
              <TableCell>Tavsif</TableCell>
              <TableCell align="right">Miqdor</TableCell>
              <TableCell>Turi</TableCell>
              <TableCell>Amallar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell align="right" sx={{ color: transaction.type === "income" ? "green" : "red" }}>
                  {transaction.amount.toLocaleString()}
                </TableCell>
                <TableCell>{transaction.type === "income" ? "Kirim" : "Chiqim"}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(transaction)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(transaction.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSave}>
          <DialogTitle>{editingTransaction ? "Tranzaksiyani tahrirlash" : "Tranzaksiya qo‘shish"}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="description"
              label="Tavsif"
              type="text"
              fullWidth
              variant="standard"
              defaultValue={editingTransaction?.description || ""}
            />
            <TextField
              margin="dense"
              name="amount"
              label="Miqdor"
              type="number"
              fullWidth
              variant="standard"
              defaultValue={editingTransaction?.amount || ""}
            />
            <TextField
              margin="dense"
              name="date"
              label="Sana"
              type="date"
              fullWidth
              variant="standard"
              InputLabelProps={{ shrink: true }}
              defaultValue={editingTransaction?.date ? editingTransaction.date.split("T")[0] : new Date().toISOString().split("T")[0]}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel id="type-label">Turi</InputLabel>
              <Select
                labelId="type-label"
                name="type"
                value={selectedType} // controlled component
                onChange={handleTypeChange} // type o'zgarganda state yangilanadi
              >
                <MenuItem value="income">Kirim</MenuItem>
                <MenuItem value="expense">Chiqim</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Bekor qilish</Button>
            <Button type="submit">Saqlash</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

export default TransactionsTable
