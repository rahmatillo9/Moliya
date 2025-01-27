'use client'
// components/ExpenseForm.js
import React, { useState } from 'react';
import { TextField, Button, Box, MenuItem, Typography } from '@mui/material';

const categories = ['Food', 'Transport', 'Entertainment', 'Others'];

const ExpenseForm = () => {
  const [form, setForm] = useState({
    category: '',
    amount: '',
    date: '',
    note: '',
    otherCategory: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(form);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 400,
        mx: 'auto',
        mt: 4,
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: 'background.paper'
      }}
    >
      <Typography variant="h4" gutterBottom>
        Expense Form
      </Typography>
      <TextField
        select
        label="Category"
        name="category"
        value={form.category}
        onChange={handleChange}
        required
      >
        {categories.map((cat) => (
          <MenuItem key={cat} value={cat}>
            {cat}
          </MenuItem>
        ))}
      </TextField>
      {form.category === 'Others' && (
        <TextField
          label="Other Category"
          name="otherCategory"
          value={form.otherCategory}
          onChange={handleChange}
          required
        />
      )}
      <TextField
        label="Amount"
        name="amount"
        type="number"
        value={form.amount}
        onChange={handleChange}
        required
      />
      <TextField
        label="Date"
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        required
      />
      <TextField
        label="Note"
        name="note"
        value={form.note}
        onChange={handleChange}
        multiline
        rows={2}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
};

export default ExpenseForm;
