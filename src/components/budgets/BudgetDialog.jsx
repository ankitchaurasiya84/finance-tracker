// import React, { useState } from 'react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
//   Grid,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem
// } from '@mui/material';
// import { categories } from '../../utils/dummyData';

// const BudgetDialog = ({ 
//   open, 
//   onClose, 
//   transactions, 
//   budgets, 
//   setBudgets, 
//   showSnackbar 
// }) => {
//   const [formData, setFormData] = useState({ category: '', budget: '' });

//   const handleSubmit = () => {
//     if (!formData.category || !formData.budget) {
//       showSnackbar('Please fill all fields', 'error');
//       return;
//     }

//     if (parseFloat(formData.budget) <= 0) {
//       showSnackbar('Budget amount must be greater than 0', 'error');
//       return;
//     }

//     const spent = transactions
//       .filter(t => t.type === 'expense' && t.category === formData.category)
//       .reduce((sum, t) => sum + t.amount, 0);

//     const newBudget = {
//       category: formData.category,
//       budget: parseFloat(formData.budget),
//       spent
//     };

//     const existingIndex = budgets.findIndex(b => b.category === formData.category);
//     if (existingIndex >= 0) {
//       setBudgets(budgets.map((b, i) => i === existingIndex ? newBudget : b));
//       showSnackbar('Budget updated successfully');
//     } else {
//       setBudgets([...budgets, newBudget]);
//       showSnackbar('Budget added successfully');
//     }

//     handleClose();
//   };

//   const handleClose = () => {
//     onClose();
//     setFormData({ category: '', budget: '' });
//   };

//   const handleInputChange = (field, value) => {
//     setFormData({ ...formData, [field]: value });
//   };

//   return (
//     <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
//       <DialogTitle>Set Budget</DialogTitle>
//       <DialogContent>
//         <Grid container spacing={2} sx={{ mt: 1 }}>
//           <Grid item xs={12}>
//             <FormControl fullWidth>
//               <InputLabel>Category</InputLabel>
//               <Select
//                 value={formData.category}
//                 onChange={(e) => handleInputChange('category', e.target.value)}
//                 label="Category"
//               >
//                 {categories.map(cat => (
//                   <MenuItem key={cat} value={cat}>{cat}</MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Budget Amount"
//               type="number"
//               value={formData.budget}
//               onChange={(e) => handleInputChange('budget', e.target.value)}
//               inputProps={{ min: 0, step: 0.01 }}
//               helperText="Enter the maximum amount you want to spend in this category"
//             />
//           </Grid>
//         </Grid>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleClose}>Cancel</Button>
//         <Button onClick={handleSubmit} variant="contained">
//           Set Budget
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default BudgetDialog;


import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  IconButton,
  Divider,
  Fade,
  Paper
} from '@mui/material';
import { 
  Close as CloseIcon,
  AccountBalanceWallet as WalletIcon,
  Category as CategoryIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { categories } from '../../utils/dummyData';

const BudgetDialog = ({
  open,
  onClose,
  transactions,
  budgets,
  setBudgets,
  showSnackbar
}) => {
  const theme = useTheme();
  const [formData, setFormData] = useState({ category: '', budget: '' });

  const handleSubmit = () => {
    if (!formData.category || !formData.budget) {
      showSnackbar('Please fill all fields', 'error');
      return;
    }
    if (parseFloat(formData.budget) <= 0) {
      showSnackbar('Budget amount must be greater than 0', 'error');
      return;
    }

    const spent = transactions
      .filter(t => t.type === 'expense' && t.category === formData.category)
      .reduce((sum, t) => sum + t.amount, 0);

    const newBudget = {
      category: formData.category,
      budget: parseFloat(formData.budget),
      spent
    };

    const existingIndex = budgets.findIndex(b => b.category === formData.category);
    if (existingIndex >= 0) {
      setBudgets(budgets.map((b, i) => i === existingIndex ? newBudget : b));
      showSnackbar('Budget updated successfully');
    } else {
      setBudgets([...budgets, newBudget]);
      showSnackbar('Budget added successfully');
    }
    handleClose();
  };

  const handleClose = () => {
    onClose();
    setFormData({ category: '', budget: '' });
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const getCurrentSpent = () => {
    if (!formData.category) return 0;
    return transactions
      .filter(t => t.type === 'expense' && t.category === formData.category)
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const currentSpent = getCurrentSpent();
  const existingBudget = budgets.find(b => b.category === formData.category);

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="sm" 
      fullWidth
      TransitionComponent={Fade}
      PaperProps={{
        elevation: theme.palette.mode === 'dark' ? 12 : 8,
        sx: {
          borderRadius: 3,
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
            : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
        }
      }}
    >
      {/* Enhanced Header */}
      <DialogTitle sx={{ pb: 1 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={1.5}>
            <Box
              sx={{
                p: 1,
                borderRadius: 2,
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <WalletIcon />
            </Box>
            <Box>
              <Typography variant="h5" fontWeight="600">
                {existingBudget ? 'Update Budget' : 'Set New Budget'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage your spending limits
              </Typography>
            </Box>
          </Box>
          <IconButton 
            onClick={handleClose}
            size="small"
            sx={{
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
                transform: 'rotate(90deg)',
                transition: 'transform 0.2s ease-in-out'
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <Divider sx={{ mx: 3 }} />

      <DialogContent sx={{ pt: 3 }}>
        <Grid container spacing={3}>
          {/* Category Selection */}
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                backgroundColor: theme.palette.mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.05)' 
                  : 'rgba(0, 0, 0, 0.02)',
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2
              }}
            >
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <CategoryIcon color="primary" />
                <Typography variant="subtitle1" fontWeight="500">
                  Select Category
                </Typography>
              </Box>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  label="Category"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                >
                  {categories.map(cat => (
                    <MenuItem key={cat} value={cat}>
                      <Typography>{cat}</Typography>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Paper>
          </Grid>

          {/* Budget Amount */}
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                backgroundColor: theme.palette.mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.05)' 
                  : 'rgba(0, 0, 0, 0.02)',
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2
              }}
            >
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <TrendingUpIcon color="primary" />
                <Typography variant="subtitle1" fontWeight="500">
                  Budget Amount
                </Typography>
              </Box>
              <TextField
                fullWidth
                label="Budget Amount (₹)"
                type="number"
                value={formData.budget}
                onChange={(e) => handleInputChange('budget', e.target.value)}
                inputProps={{ min: 0, step: 0.01 }}
                helperText="Enter the maximum amount you want to spend in this category"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />
            </Paper>
          </Grid>

          {/* Current Spending Info */}
          {formData.category && (
            <Grid item xs={12}>
              <Fade in={true}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    backgroundColor: theme.palette.mode === 'dark' 
                      ? 'rgba(33, 150, 243, 0.1)' 
                      : 'rgba(33, 150, 243, 0.05)',
                    border: `1px solid ${theme.palette.primary.main}40`,
                    borderRadius: 2
                  }}
                >
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    Current Spending Information
                  </Typography>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" color="text.secondary">
                      Already spent in {formData.category}:
                    </Typography>
                    <Typography variant="h6" fontWeight="500" color="primary">
                      ₹{currentSpent.toFixed(2)}
                    </Typography>
                  </Box>
                  {existingBudget && (
                    <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                      <Typography variant="body2" color="text.secondary">
                        Current budget:
                      </Typography>
                      <Typography variant="body2" fontWeight="500">
                        ₹{existingBudget.budget.toFixed(2)}
                      </Typography>
                    </Box>
                  )}
                </Paper>
              </Fade>
            </Grid>
          )}
        </Grid>
      </DialogContent>

      <Divider sx={{ mx: 3 }} />

      <DialogActions sx={{ p: 3, gap: 2 }}>
        <Button 
          onClick={handleClose}
          variant="outlined"
          size="large"
          sx={{
            borderRadius: 2,
            px: 3,
            borderColor: theme.palette.divider,
            color: 'text.secondary',
            '&:hover': {
              borderColor: theme.palette.text.secondary,
              backgroundColor: theme.palette.action.hover
            }
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained"
          size="large"
          disabled={!formData.category || !formData.budget}
          sx={{
            borderRadius: 2,
            px: 4,
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
              : 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
            '&:hover': {
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(45deg, #1976d2 30%, #1e88e5 90%)'
                : 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
            },
            '&:disabled': {
              background: theme.palette.action.disabledBackground,
              color: theme.palette.action.disabled
            }
          }}
        >
          {existingBudget ? 'Update Budget' : 'Set Budget'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BudgetDialog;