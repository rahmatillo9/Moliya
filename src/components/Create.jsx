"use client"

import React, { useState, useEffect } from "react"
import { TextField, Button, Box, MenuItem, Typography, FormControl, InputLabel, Select } from "@mui/material"
import axios from "axios"
import { jwtDecode } from "jwt-decode"

const categories = ["Food", "Transport", "Entertainment", "Others"]
const transactionTypes = ["income", "expense"]

const ExpenseForm = () => {
  const [userId, setUserId] = useState(null)
  const [form, setForm] = useState({
    amount: "",
    description: "",
    type: "expense",
    date: "",
    category: "",
  })

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    if (token) {
      const decodedToken = jwtDecode(token)
      setUserId(decodedToken.id)
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prevForm) => ({
      ...prevForm,
      [name]: name === "amount" ? (value === "" ? "" : Number(value)) : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!userId) {
      console.error("User ID not found")
      return
    }

    if (!form.type || !transactionTypes.includes(form.type)) {
      console.error("Invalid transaction type")
      return
    }

    try {
      const response = await axios.post("http://localhost:4000/transactions", {
        user_id: userId,
        amount: form.amount,
        description: form.description,
        type: form.type,
        date: form.date,
        category: form.category,
      })
      console.log("Transaction added:", response.data)
      // Form ni tozalash
      setForm({
        amount: "",
        description: "",
        type: "expense",
        date: "",
        category: "",
      })
      alert("Create  successful!");
    } catch (error) {
      console.error("Error adding transaction:", error)
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        mx: "auto",
        mt: 4,
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Transaction Form
      </Typography>
      <FormControl fullWidth required>
        <InputLabel id="type-label">Type</InputLabel>
        <Select labelId="type-label" label="Type" name="type" value={form.type} onChange={handleChange}>
          {transactionTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        select
        label="Category"
        name="category"
        value={form.category}
        onChange={handleChange}
        required
        fullWidth
      >
        {categories.map((cat) => (
          <MenuItem key={cat} value={cat}>
            {cat}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Amount"
        name="amount"
        type="number"
        value={form.amount}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Date"
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        required
        fullWidth
      />
      <TextField
        label="Description"
        name="description"
        value={form.description}
        onChange={handleChange}
        multiline
        rows={2}
        required
        fullWidth
      />
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </Box>
  )
}

export default ExpenseForm

