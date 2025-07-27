// import React from 'react';
// import { Container, Grid, Card, CardContent, Typography, Box } from '@mui/material';
// import { TrendingUp, TrendingDown, AccountBalance } from '@mui/icons-material';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import SummaryCard from '../components/common/SummaryCard';
// import ChartCard from '../components/common/ChartCard';
// import TransactionTable from '../components/transactions/TransactionTable';
// import { calculateTotalIncome, calculateTotalExpense, calculateBalance, getCategoryExpenses } from '../utils/helpers';
// import { categories } from '../utils/dummyData';

// const Dashboard = ({ transactions }) => {
//   const totalIncome = calculateTotalIncome(transactions);
//   const totalExpense = calculateTotalExpense(transactions);
//   const balance = calculateBalance(transactions);
  
//   const recentTransactions = transactions.slice(-5).reverse();
//   const categoryExpenses = getCategoryExpenses(transactions, categories).slice(0, 3);

//   const chartData = [
//     { name: 'This Month', income: totalIncome, expenses: totalExpense }
//   ];

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//       <Grid container spacing={3}>
//         {/* Summary Cards */}
//         <Grid item xs={12} sm={4}>
//           <SummaryCard 
//             title="Total Income"
//             amount={totalIncome}
//             icon={<TrendingUp />}
//             color="success"
//           />
//         </Grid>
        
//         <Grid item xs={12} sm={4}>
//           <SummaryCard 
//             title="Total Expenses"
//             amount={totalExpense}
//             icon={<TrendingDown />}
//             color="error"
//           />
//         </Grid>
        
//         <Grid item xs={12} sm={4}>
//           <SummaryCard 
//             title="Balance"
//             amount={balance}
//             icon={<AccountBalance />}
//             color={balance >= 0 ? "success" : "error"}
//           />
//         </Grid>

//         {/* Chart */}
//         {/* <Grid item xs={12} md={8}>
//           <ChartCard title="Income vs Expenses">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={chartData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Line type="monotone" dataKey="income" stroke="#4caf50" />
//                 <Line type="monotone" dataKey="expenses" stroke="#f44336" />
//               </LineChart>
//             </ResponsiveContainer>
//           </ChartCard>
//         </Grid> */}

//         {/* Top Categories */}
//         <Grid item xs={12} md={4}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>Top Spending Categories</Typography>
//               {categoryExpenses.length > 0 ? (
//                 categoryExpenses.map((item, index) => (
//                   <Box key={item.category} display="flex" justifyContent="space-between" mb={1}>
//                     <Typography>{item.category}</Typography>
//                     <Typography fontWeight="bold">₹{item.amount}</Typography>
//                   </Box>
//                 ))
//               ) : (
//                 <Typography color="textSecondary">No expenses yet</Typography>
//               )}
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Recent Transactions */}
//         <Grid item xs={12}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>Recent Transactions</Typography>
//               {recentTransactions.length > 0 ? (
//                 <TransactionTable 
//                   transactions={recentTransactions} 
//                   showActions={false}
//                 />
//               ) : (
//                 <Typography color="textSecondary">No transactions yet</Typography>
//               )}
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default Dashboard;

import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  Chip,
  Avatar,
  LinearProgress,
  Divider,
  Fade,
  Grow,
  useTheme,
  alpha
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  AccountBalance,
  Receipt,
  Category,
  Timeline
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import SummaryCard from '../components/common/SummaryCard';
import ChartCard from '../components/common/ChartCard';
import TransactionTable from '../components/transactions/TransactionTable';
import { calculateTotalIncome, calculateTotalExpense, calculateBalance, getCategoryExpenses } from '../utils/helpers';
import { categories } from '../utils/dummyData';

const Dashboard = ({ transactions }) => {
  const theme = useTheme();
  const totalIncome = calculateTotalIncome(transactions);
  const totalExpense = calculateTotalExpense(transactions);
  const balance = calculateBalance(transactions);
  
  const recentTransactions = transactions.slice(-5).reverse();
  const categoryExpenses = getCategoryExpenses(transactions, categories).slice(0, 5);

  const chartData = [
    { name: 'This Month', income: totalIncome, expenses: totalExpense }
  ];

  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  // Enhanced Summary Card Component
  const EnhancedSummaryCard = ({ title, amount, icon, color, gradient, delay = 0 }) => (
    <Grow in={true} timeout={800} style={{ transitionDelay: `${delay}ms` }}>
      <Card
        elevation={0}
        sx={{
          height: '100%',
          background: gradient,
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme.shadows[8],
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255,255,255,0.1)',
            opacity: 0,
            transition: 'opacity 0.3s ease',
          },
          '&:hover::before': {
            opacity: 1,
          }
        }}
      >
        <CardContent sx={{ position: 'relative', zIndex: 1 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 500 }}>
              {title}
            </Typography>
            <Avatar
              sx={{
                bgcolor: 'rgba(255,255,255,0.2)',
                color: 'white',
                width: 48,
                height: 48,
              }}
            >
              {icon}
            </Avatar>
          </Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 1,
              textShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            ₹{amount.toLocaleString('en-IN')}
          </Typography>
        </CardContent>
      </Card>
    </Grow>
  );

  // Enhanced Category Card
  const CategoryCard = ({ categoryExpenses }) => (
    <Fade in={true} timeout={1000}>
      <Card
        elevation={2}
        sx={{
          height: '100%',
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: theme.shadows[6],
          }
        }}
      >
        <CardContent>
          <Box display="flex" alignItems="center" mb={3}>
            <Category sx={{ mr: 1, color: theme.palette.primary.main }} />
            <Typography variant="h6" fontWeight={600}>
              Top Spending Categories
            </Typography>
          </Box>
          
          {categoryExpenses.length > 0 ? (
            <Box>
              {categoryExpenses.map((item, index) => {
                const percentage = totalExpense > 0 ? (item.amount / totalExpense) * 100 : 0;
                return (
                  <Box key={item.category} sx={{ mb: 2.5 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                      <Box display="flex" alignItems="center">
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            bgcolor: COLORS[index % COLORS.length],
                            mr: 1.5,
                          }}
                        />
                        <Typography variant="body2" fontWeight={500}>
                          {item.category}
                        </Typography>
                      </Box>
                      <Chip
                        label={`₹${item.amount.toLocaleString('en-IN')}`}
                        size="small"
                        sx={{
                          bgcolor: alpha(COLORS[index % COLORS.length], 0.1),
                          color: COLORS[index % COLORS.length],
                          fontWeight: 600,
                        }}
                      />
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={percentage}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        bgcolor: alpha(COLORS[index % COLORS.length], 0.1),
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 3,
                          bgcolor: COLORS[index % COLORS.length],
                        },
                      }}
                    />
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      sx={{ fontSize: '0.75rem', mt: 0.5, display: 'block' }}
                    >
                      {percentage.toFixed(1)}% of total expenses
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          ) : (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              py={4}
            >
              <Receipt sx={{ fontSize: 48, color: theme.palette.grey[400], mb: 1 }} />
              <Typography color="textSecondary" align="center">
                No expenses yet
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Fade>
  );

  // Enhanced Recent Transactions Card
  const RecentTransactionsCard = ({ transactions }) => (
    <Fade in={true} timeout={1200}>
      <Card
        elevation={2}
        sx={{
          background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)} 0%, ${alpha(theme.palette.background.paper, 1)} 100%)`,
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: theme.shadows[4],
          }
        }}
      >
        <CardContent>
          <Box display="flex" alignItems="center" mb={3}>
            <Timeline sx={{ mr: 1, color: theme.palette.secondary.main }} />
            <Typography variant="h6" fontWeight={600}>
              Recent Transactions
            </Typography>
            {transactions.length > 0 && (
              <Chip
                label={`${transactions.length} recent`}
                size="small"
                sx={{ ml: 'auto', bgcolor: alpha(theme.palette.secondary.main, 0.1) }}
              />
            )}
          </Box>
          
          {transactions.length > 0 ? (
            <TransactionTable 
              transactions={transactions} 
              showActions={false}
            />
          ) : (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              py={6}
            >
              <Receipt sx={{ fontSize: 64, color: theme.palette.grey[300], mb: 2 }} />
              <Typography variant="h6" color="textSecondary" gutterBottom>
                No transactions yet
              </Typography>
              <Typography variant="body2" color="textSecondary" align="center">
                Start by adding your first transaction
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Fade>
  );

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Fade in={true} timeout={500}>
        <Box mb={4}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1,
            }}
          >
            Financial Dashboard
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Overview of your financial activities
          </Typography>
          <Divider sx={{ mt: 2, background: `linear-gradient(90deg, ${theme.palette.primary.main}, transparent)` }} />
        </Box>
      </Fade>

      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} sm={4}>
          <EnhancedSummaryCard 
            title="Total Income"
            amount={totalIncome}
            icon={<TrendingUp />}
            gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            delay={100}
          />
        </Grid>
        
        <Grid item xs={12} sm={4}>
          <EnhancedSummaryCard 
            title="Total Expenses"
            amount={totalExpense}
            icon={<TrendingDown />}
            gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
            delay={200}
          />
        </Grid>
        
        <Grid item xs={12} sm={4}>
          <EnhancedSummaryCard 
            title="Balance"
            amount={balance}
            icon={<AccountBalance />}
            gradient={balance >= 0 
              ? "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
              : "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
            }
            delay={300}
          />
        </Grid>

        {/* Chart Section */}
        <Grid item xs={12} md={8}>
          <Fade in={true} timeout={1000}>
            <Card
              elevation={2}
              sx={{
                background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.paper, 1)} 100%)`,
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: theme.shadows[6],
                }
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight={600} mb={3}>
                  Financial Overview
                </Typography>
                <Box height={300}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.3)} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: theme.palette.background.paper,
                          border: `1px solid ${theme.palette.divider}`,
                          borderRadius: theme.shape.borderRadius,
                          boxShadow: theme.shadows[4],
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="income"
                        stroke={theme.palette.success.main}
                        strokeWidth={3}
                        dot={{ fill: theme.palette.success.main, strokeWidth: 2, r: 6 }}
                        activeDot={{ r: 8, stroke: theme.palette.success.main, strokeWidth: 2 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="expenses"
                        stroke={theme.palette.error.main}
                        strokeWidth={3}
                        dot={{ fill: theme.palette.error.main, strokeWidth: 2, r: 6 }}
                        activeDot={{ r: 8, stroke: theme.palette.error.main, strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Fade>
        </Grid>

        {/* Top Categories */}
        <Grid item xs={12} md={4}>
          <CategoryCard categoryExpenses={categoryExpenses} />
        </Grid>

        {/* Recent Transactions */}
        <Grid item xs={12}>
          <RecentTransactionsCard transactions={recentTransactions} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;