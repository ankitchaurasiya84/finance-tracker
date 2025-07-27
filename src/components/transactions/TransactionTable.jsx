import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Typography
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const TransactionTable = ({ 
  transactions, 
  onEdit, 
  onDelete, 
  showActions = true 
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Type</TableCell>
            <TableCell align="right">Amount</TableCell>
            {showActions && <TableCell align="right">Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell>
                <Chip 
                  label={transaction.type} 
                  color={transaction.type === 'income' ? 'success' : 'error'}
                  size="small"
                />
              </TableCell>
              <TableCell align="right">
                <Typography color={transaction.type === 'income' ? 'success.main' : 'error.main'}>
                  {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount}
                </Typography>
              </TableCell>
              {showActions && (
                <TableCell align="right">
                  <IconButton onClick={() => onEdit(transaction)} size="small">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => onDelete(transaction.id)} size="small" color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionTable;