// import React, { useState } from 'react';
// import { Container, Box, Typography, Button, Card, CardContent } from '@mui/material';
// import { Add } from '@mui/icons-material';
// import TransactionDialog from '../components/transactions/TransactionDialog';
// import TransactionTable from '../components/transactions/TransactionTable';

// const Transactions = ({ transactions, setTransactions, showSnackbar }) => {
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [editingTransaction, setEditingTransaction] = useState(null);

//   const handleEdit = (transaction) => {
//     setEditingTransaction(transaction);
//     setDialogOpen(true);
//   };

//   const handleDelete = (id) => {
//     setTransactions(transactions.filter(t => t.id !== id));
//     showSnackbar('Transaction deleted successfully');
//   };

//   const handleCloseDialog = () => {
//     setDialogOpen(false);
//     setEditingTransaction(null);
//   };

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
//         <Typography variant="h4">Transactions</Typography>
//         <Button 
//           variant="contained" 
//           startIcon={<Add />} 
//           onClick={() => setDialogOpen(true)}
//         >
//           Add Transaction
//         </Button>
//       </Box>

//       <Card>
//         <CardContent>
//           {transactions.length > 0 ? (
//             <TransactionTable 
//               transactions={transactions}
//               onEdit={handleEdit}
//               onDelete={handleDelete}
//               showActions={true}
//             />
//           ) : (
//             <Typography color="textSecondary" textAlign="center" py={4}>
//               No transactions yet. Add your first transaction!
//             </Typography>
//           )}
//         </CardContent>
//       </Card>

//       <TransactionDialog
//         open={dialogOpen}
//         onClose={handleCloseDialog}
//         editingTransaction={editingTransaction}
//         transactions={transactions}
//         setTransactions={setTransactions}
//         showSnackbar={showSnackbar}
//       />
//     </Container>
//   );
// };

// export default Transactions;

import React, { useState, useMemo } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack,
  IconButton,
  Tooltip,
  Paper,
  InputAdornment,
  Grid,
  Avatar,
  Divider,
  Fade,
  useTheme,
  alpha,
  useMediaQuery
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Sort as SortIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Delete as DeleteAllIcon,
  AccountBalance as IncomeIcon,
  CreditCard as ExpenseIcon,
  SwapVert as SwapIcon,
  CalendarToday as CalendarIcon,
  Category as CategoryIcon,
  Clear as ClearIcon
} from '@mui/icons-material';
import TransactionDialog from '../components/transactions/TransactionDialog';
import TransactionTable from '../components/transactions/TransactionTable';

const Transactions = ({ 
  transactions, 
  setTransactions, 
  showSnackbar, 
  isDarkMode = false 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // State management
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedTransactions, setSelectedTransactions] = useState([]);

  // Get unique categories from transactions
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(transactions.map(t => t.category))];
    return uniqueCategories.filter(Boolean);
  }, [transactions]);

  // Filter and sort transactions
  const filteredTransactions = useMemo(() => {
    let filtered = transactions.filter(transaction => {
      const matchesSearch = transaction.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           transaction.category?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || transaction.type === filterType;
      const matchesCategory = filterCategory === 'all' || transaction.category === filterCategory;
      
      return matchesSearch && matchesType && matchesCategory;
    });

    // Sort transactions
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.date) - new Date(b.date);
          break;
        case 'amount':
          comparison = a.amount - b.amount;
          break;
        case 'description':
          comparison = a.description?.localeCompare(b.description) || 0;
          break;
        case 'category':
          comparison = a.category?.localeCompare(b.category) || 0;
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [transactions, searchTerm, filterType, filterCategory, sortBy, sortOrder]);

  // Calculate summary statistics
  const summary = useMemo(() => {
    const filtered = filteredTransactions;
    const totalIncome = filtered.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = filtered.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const netAmount = totalIncome - totalExpenses;
    
    return {
      totalTransactions: filtered.length,
      totalIncome,
      totalExpenses,
      netAmount
    };
  }, [filteredTransactions]);

  // Event handlers
  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setDialogOpen(true);
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
    setSelectedTransactions(prev => prev.filter(selectedId => selectedId !== id));
    showSnackbar('Transaction deleted successfully', 'success');
  };

  const handleBulkDelete = () => {
    if (selectedTransactions.length === 0) return;
    
    setTransactions(transactions.filter(t => !selectedTransactions.includes(t.id)));
    setSelectedTransactions([]);
    showSnackbar(`${selectedTransactions.length} transactions deleted`, 'success');
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingTransaction(null);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setFilterType('all');
    setFilterCategory('all');
    setSortBy('date');
    setSortOrder('desc');
  };

  const handleExportData = () => {
    const csvContent = [
      ['Date', 'Type', 'Category', 'Description', 'Amount'],
      ...filteredTransactions.map(t => [
        t.date,
        t.type,
        t.category,
        t.description,
        t.amount
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    
    showSnackbar('Transactions exported successfully', 'success');
  };

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  // Theme-aware colors
  const getColors = () => {
    if (isDarkMode) {
      return {
        income: '#A5D6A7',
        expense: '#EF9A9A',
        primary: '#90CAF9',
        secondary: '#CE93D8'
      };
    } else {
      return {
        income: '#4CAF50',
        expense: '#F44336',
        primary: '#1976D2',
        secondary: '#9C27B0'
      };
    }
  };

  const colors = getColors();

  return (
    <Container maxWidth="xl" sx={{ mt: 3, mb: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h3" 
          component="h1"
          sx={{ 
            fontWeight: 700,
            background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            mb: 1
          }}
        >
          Transactions
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Manage and track all your financial transactions
        </Typography>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            elevation={0}
            sx={{
              background: `linear-gradient(135deg, ${alpha(colors.primary, 0.1)}, ${alpha(colors.primary, 0.05)})`,
              border: `1px solid ${alpha(colors.primary, 0.2)}`,
              transition: 'transform 0.2s ease',
              '&:hover': { transform: 'translateY(-2px)' }
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total Transactions
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: colors.primary }}>
                    {summary.totalTransactions}
                  </Typography>
                </Box>
                <Avatar sx={{ backgroundColor: alpha(colors.primary, 0.1), color: colors.primary }}>
                  <SwapIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            elevation={0}
            sx={{
              background: `linear-gradient(135deg, ${alpha(colors.income, 0.1)}, ${alpha(colors.income, 0.05)})`,
              border: `1px solid ${alpha(colors.income, 0.2)}`,
              transition: 'transform 0.2s ease',
              '&:hover': { transform: 'translateY(-2px)' }
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total Income
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: colors.income }}>
                    ₹{summary.totalIncome.toLocaleString()}
                  </Typography>
                </Box>
                <Avatar sx={{ backgroundColor: alpha(colors.income, 0.1), color: colors.income }}>
                  <IncomeIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            elevation={0}
            sx={{
              background: `linear-gradient(135deg, ${alpha(colors.expense, 0.1)}, ${alpha(colors.expense, 0.05)})`,
              border: `1px solid ${alpha(colors.expense, 0.2)}`,
              transition: 'transform 0.2s ease',
              '&:hover': { transform: 'translateY(-2px)' }
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total Expenses
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: colors.expense }}>
                    ₹{summary.totalExpenses.toLocaleString()}
                  </Typography>
                </Box>
                <Avatar sx={{ backgroundColor: alpha(colors.expense, 0.1), color: colors.expense }}>
                  <ExpenseIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            elevation={0}
            sx={{
              background: `linear-gradient(135deg, ${alpha(summary.netAmount >= 0 ? colors.income : colors.expense, 0.1)}, ${alpha(summary.netAmount >= 0 ? colors.income : colors.expense, 0.05)})`,
              border: `1px solid ${alpha(summary.netAmount >= 0 ? colors.income : colors.expense, 0.2)}`,
              transition: 'transform 0.2s ease',
              '&:hover': { transform: 'translateY(-2px)' }
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Net Balance
                  </Typography>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 700, 
                      color: summary.netAmount >= 0 ? colors.income : colors.expense 
                    }}
                  >
                    ₹{summary.netAmount.toLocaleString()}
                  </Typography>
                </Box>
                <Avatar sx={{ 
                  backgroundColor: alpha(summary.netAmount >= 0 ? colors.income : colors.expense, 0.1), 
                  color: summary.netAmount >= 0 ? colors.income : colors.expense 
                }}>
                  <SwapIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Action Bar */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 3, 
          mb: 3, 
          border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
          borderRadius: 2
        }}
      >
        <Stack 
          direction={isMobile ? 'column' : 'row'} 
          spacing={2} 
          alignItems={isMobile ? 'stretch' : 'center'}
          justifyContent="space-between"
        >
          <Stack direction={isMobile ? 'column' : 'row'} spacing={2} sx={{ flex: 1 }}>
            {/* Search */}
            <TextField
              size="small"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearchTerm('')}>
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{ minWidth: isMobile ? 'auto' : 300 }}
            />

            {/* Filters */}
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Type</InputLabel>
              <Select
                value={filterType}
                label="Type"
                onChange={(e) => setFilterType(e.target.value)}
              >
                <MenuItem value="all">All Types</MenuItem>
                <MenuItem value="income">Income</MenuItem>
                <MenuItem value="expense">Expense</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={filterCategory}
                label="Category"
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <MenuItem value="all">All Categories</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="date">Date</MenuItem>
                <MenuItem value="amount">Amount</MenuItem>
                <MenuItem value="description">Description</MenuItem>
                <MenuItem value="category">Category</MenuItem>
              </Select>
            </FormControl>

            <Tooltip title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}>
              <IconButton 
                onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                color="primary"
              >
                <SortIcon sx={{ transform: sortOrder === 'desc' ? 'rotate(180deg)' : 'none' }} />
              </IconButton>
            </Tooltip>

            {(searchTerm || filterType !== 'all' || filterCategory !== 'all' || sortBy !== 'date') && (
              <Button
                variant="outlined"
                startIcon={<ClearIcon />}
                onClick={handleClearFilters}
                size="small"
              >
                Clear Filters
              </Button>
            )}
          </Stack>

          {/* Action Buttons */}
          <Stack direction="row" spacing={1}>
            {selectedTransactions.length > 0 && (
              <Tooltip title="Delete Selected">
                <IconButton 
                  color="error" 
                  onClick={handleBulkDelete}
                  sx={{ 
                    border: `1px solid ${alpha(colors.expense, 0.3)}`,
                    '&:hover': { backgroundColor: alpha(colors.expense, 0.1) }
                  }}
                >
                  <DeleteAllIcon />
                </IconButton>
              </Tooltip>
            )}
            
            <Tooltip title="Export CSV">
              <IconButton 
                onClick={handleExportData}
                color="primary"
                sx={{ 
                  border: `1px solid ${alpha(colors.primary, 0.3)}`,
                  '&:hover': { backgroundColor: alpha(colors.primary, 0.1) }
                }}
              >
                <DownloadIcon />
              </IconButton>
            </Tooltip>

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setDialogOpen(true)}
              sx={{
                background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`,
                '&:hover': {
                  background: `linear-gradient(45deg, ${alpha(colors.primary, 0.8)}, ${alpha(colors.secondary, 0.8)})`
                }
              }}
            >
              Add Transaction
            </Button>
          </Stack>
        </Stack>

        {/* Active Filters Display */}
        {(searchTerm || filterType !== 'all' || filterCategory !== 'all') && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Active Filters:
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {searchTerm && (
                <Chip
                  label={`Search: "${searchTerm}"`}
                  onDelete={() => setSearchTerm('')}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              )}
              {filterType !== 'all' && (
                <Chip
                  label={`Type: ${filterType}`}
                  onDelete={() => setFilterType('all')}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              )}
              {filterCategory !== 'all' && (
                <Chip
                  label={`Category: ${filterCategory}`}
                  onDelete={() => setFilterCategory('all')}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              )}
            </Stack>
          </Box>
        )}
      </Paper>

      {/* Transactions Table */}
      <Card 
        elevation={0}
        sx={{ 
          border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
          borderRadius: 2
        }}
      >
        <CardContent sx={{ p: 0 }}>
          {filteredTransactions.length > 0 ? (
            <TransactionTable
              transactions={filteredTransactions}
              onEdit={handleEdit}
              onDelete={handleDelete}
              showActions={true}
              selectedTransactions={selectedTransactions}
              setSelectedTransactions={setSelectedTransactions}
              onSort={toggleSort}
              sortBy={sortBy}
              sortOrder={sortOrder}
              isDarkMode={isDarkMode}
            />
          ) : (
            <Box sx={{ 
              textAlign: 'center', 
              py: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <SwapIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h5" color="text.secondary" sx={{ mb: 1 }}>
                {transactions.length === 0 
                  ? 'No transactions yet' 
                  : 'No transactions match your filters'
                }
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {transactions.length === 0 
                  ? 'Add your first transaction to get started!' 
                  : 'Try adjusting your search or filter criteria'
                }
              </Typography>
              {transactions.length === 0 && (
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setDialogOpen(true)}
                  sx={{ mt: 2 }}
                >
                  Add Your First Transaction
                </Button>
              )}
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Transaction Dialog */}
      <TransactionDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        editingTransaction={editingTransaction}
        transactions={transactions}
        setTransactions={setTransactions}
        showSnackbar={showSnackbar}
        isDarkMode={isDarkMode}
      />
    </Container>
  );
};

export default Transactions;