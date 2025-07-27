import React, { useState } from 'react';
import { Container, Box, Typography, Button, Grid } from '@mui/material';
import { Add } from '@mui/icons-material';
import BudgetCard from '../components/budgets/BudgetCard';
import BudgetDialog from '../components/budgets/BudgetDialog';

const Budgets = ({ transactions, budgets, setBudgets, showSnackbar }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Budgets</Typography>
        <Button 
          variant="contained" 
          startIcon={<Add />} 
          onClick={() => setDialogOpen(true)}
        >
          Set Budget
        </Button>
      </Box>

      {budgets.length > 0 ? (
        <Grid container spacing={3}>
          {budgets.map((budget) => (
            <Grid item xs={12} md={6} key={budget.category}>
              <BudgetCard budget={budget} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography color="textSecondary" textAlign="center" py={4}>
          No budgets set yet. Create your first budget to track spending!
        </Typography>
      )}

      <BudgetDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        transactions={transactions}
        budgets={budgets}
        setBudgets={setBudgets}
        showSnackbar={showSnackbar}
      />
    </Container>
  );
};

export default Budgets;