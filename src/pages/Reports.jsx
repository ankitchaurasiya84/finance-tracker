// import React from 'react';
// import { Container, Typography, Grid } from '@mui/material';
// import { 
//   PieChart, 
//   Pie, 
//   Cell, 
//   BarChart, 
//   Bar, 
//   XAxis, 
//   YAxis, 
//   CartesianGrid, 
//   Tooltip, 
//   Legend, 
//   LineChart, 
//   Line, 
//   ResponsiveContainer 
// } from 'recharts';
// import ChartCard from '../components/common/ChartCard';
// import { getCategoryExpenses, calculateTotalIncome, calculateTotalExpense } from '../utils/helpers';
// import { categories } from '../utils/dummyData';

// const Reports = ({ transactions }) => {
//   const totalIncome = calculateTotalIncome(transactions);
//   const totalExpense = calculateTotalExpense(transactions);
  
//   const expensesByCategory = getCategoryExpenses(transactions, categories).map(item => ({
//     name: item.category,
//     value: item.amount
//   }));

//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF7C7C'];

//   const monthlyData = [
//     { month: 'Jun', income: 2800, expenses: 2200 },
//     { month: 'Jul', income: totalIncome, expenses: totalExpense }
//   ];

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//       <Typography variant="h4" gutterBottom>Reports</Typography>
      
//       <Grid container spacing={3}>
//         {/* Expense by Category Pie Chart */}
//         <Grid item xs={12} md={6}>
//           <ChartCard title="Expenses by Category">
//             {expensesByCategory.length > 0 ? (
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={expensesByCategory}
//                     cx="50%"
//                     cy="50%"
//                     labelLine={false}
//                     label={({name, percent}) => `${name} (${(percent * 100).toFixed(0)}%)`}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     dataKey="value"
//                   >
//                     {expensesByCategory.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
//                 </PieChart>
//               </ResponsiveContainer>
//             ) : (
//               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
//                 <Typography color="textSecondary">No expense data available</Typography>
//               </div>
//             )}
//           </ChartCard>
//         </Grid>

//         {/* Monthly Comparison Bar Chart */}
//         <Grid item xs={12} md={6}>
//           <ChartCard title="Monthly Comparison">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={monthlyData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="income" fill="#4caf50" />
//                 <Bar dataKey="expenses" fill="#f44336" />
//               </BarChart>
//             </ResponsiveContainer>
//           </ChartCard>
//         </Grid>

//         {/* Income vs Expenses Trend */}
//         <Grid item xs={12}>
//           <ChartCard title="Income vs Expenses Trend" height={400}>
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={monthlyData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Line type="monotone" dataKey="income" stroke="#4caf50" strokeWidth={2} />
//                 <Line type="monotone" dataKey="expenses" stroke="#f44336" strokeWidth={2} />
//               </LineChart>
//             </ResponsiveContainer>
//           </ChartCard>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default Reports;

import React, { useState, useMemo } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Card,
  CardContent,
  useTheme,
  alpha,
  IconButton,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack,
  Divider,
  Avatar,
  useMediaQuery
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  AccountBalance as IncomeIcon,
  CreditCard as ExpenseIcon,
  PieChart as PieChartIcon,
  BarChart as BarChartIcon,
  ShowChart as LineChartIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';
import ChartCard from '../components/common/ChartCard';
import { getCategoryExpenses, calculateTotalIncome, calculateTotalExpense } from '../utils/helpers';
import { categories } from '../utils/dummyData';

const Reports = ({ transactions, isDarkMode = false }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [timeRange, setTimeRange] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const totalIncome = calculateTotalIncome(transactions);
  const totalExpense = calculateTotalExpense(transactions);
  const netSavings = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? ((netSavings / totalIncome) * 100).toFixed(1) : 0;

  // Theme-aware colors
  const getColors = () => {
    if (isDarkMode) {
      return {
        primary: '#90CAF9',
        secondary: '#CE93D8',
        success: '#A5D6A7',
        error: '#EF9A9A',
        warning: '#FFCC02',
        info: '#81D4FA',
        charts: ['#90CAF9', '#CE93D8', '#A5D6A7', '#EF9A9A', '#FFCC02', '#81D4FA', '#F8BBD9', '#B39DDB']
      };
    } else {
      return {
        primary: '#1976D2',
        secondary: '#9C27B0',
        success: '#4CAF50',
        error: '#F44336',
        warning: '#FF9800',
        info: '#2196F3',
        charts: ['#1976D2', '#9C27B0', '#4CAF50', '#F44336', '#FF9800', '#2196F3', '#E91E63', '#673AB7']
      };
    }
  };

  const colors = getColors();

  const expensesByCategory = useMemo(() => {
    return getCategoryExpenses(transactions, categories).map(item => ({
      name: item.category,
      value: item.amount,
      percentage: totalExpense > 0 ? ((item.amount / totalExpense) * 100).toFixed(1) : 0
    }));
  }, [transactions, categories, totalExpense]);

  // Enhanced monthly data with more periods
  const monthlyData = useMemo(() => [
    { month: 'Apr', income: 2500, expenses: 2100, savings: 400 },
    { month: 'May', income: 2700, expenses: 2300, savings: 400 },
    { month: 'Jun', income: 2800, expenses: 2200, savings: 600 },
    { month: 'Jul', income: totalIncome, expenses: totalExpense, savings: netSavings }
  ], [totalIncome, totalExpense, netSavings]);

  // Statistics cards data
  const statsCards = [
    {
      title: 'Total Income',
      value: `₹${totalIncome.toLocaleString()}`,
      icon: <IncomeIcon />,
      color: colors.success,
      trend: '+12%'
    },
    {
      title: 'Total Expenses',
      value: `₹${totalExpense.toLocaleString()}`,
      icon: <ExpenseIcon />,
      color: colors.error,
      trend: '+8%'
    },
    {
      title: 'Net Savings',
      value: `₹${netSavings.toLocaleString()}`,
      icon: netSavings >= 0 ? <TrendingUpIcon /> : <TrendingDownIcon />,
      color: netSavings >= 0 ? colors.success : colors.error,
      trend: `${savingsRate}%`
    }
  ];

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Paper
          elevation={8}
          sx={{
            p: 2,
            backgroundColor: alpha(theme.palette.background.paper, 0.95),
            border: `1px solid ${alpha(theme.palette.divider, 0.2)}`
          }}
        >
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            {label}
          </Typography>
          {payload.map((entry, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  backgroundColor: entry.color,
                  borderRadius: '2px',
                  mr: 1
                }}
              />
              <Typography variant="body2">
                {entry.name}: ₹{entry.value?.toLocaleString()}
              </Typography>
            </Box>
          ))}
        </Paper>
      );
    }
    return null;
  };

  // Pie chart label formatter
  const renderLabel = ({ name, percent, value }) => {
    return percent > 5 ? `${name} ${(percent * 100).toFixed(0)}%` : '';
  };

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
          Financial Reports
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Comprehensive analysis of your financial data
        </Typography>

        {/* Filters */}
        <Stack direction={isMobile ? 'column' : 'row'} spacing={2} sx={{ mb: 3 }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Time Range</InputLabel>
            <Select
              value={timeRange}
              label="Time Range"
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <MenuItem value="all">All Time</MenuItem>
              <MenuItem value="month">This Month</MenuItem>
              <MenuItem value="quarter">This Quarter</MenuItem>
              <MenuItem value="year">This Year</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              label="Category"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <MenuItem value="all">All Categories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={5} sx={{ mb: 4 }}>
        {statsCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              elevation={0}
              sx={{
                height: '100%',
                background: `linear-gradient(135deg, ${alpha(stat.color, 0.1)}, ${alpha(stat.color, 0.05)})`,
                border: `1px solid ${alpha(stat.color, 0.2)}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: `0 8px 25px ${alpha(stat.color, 0.15)}`
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: stat.color }}>
                      {stat.value}
                    </Typography>
                    <Chip
                      label={stat.trend}
                      size="small"
                      sx={{
                        mt: 1,
                        backgroundColor: alpha(stat.color, 0.1),
                        color: stat.color,
                        fontWeight: 600
                      }}
                    />
                  </Box>
                  <Avatar
                    sx={{
                      backgroundColor: alpha(stat.color, 0.1),
                      color: stat.color,
                      width: 56,
                      height: 56
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={5}>
        {/* Enhanced Pie Chart */}
        <Grid item xs={12} lg={6}>
          <ChartCard 
            title="Expenses by Category" 
            icon={<PieChartIcon />}
            height={400}
          >
            {expensesByCategory.length > 0 ? (
              <ResponsiveContainer width="110%" height="100%">
                <PieChart>
                  <Pie
                    data={expensesByCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderLabel}
                    outerRadius={120}
                    innerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={800}
                  >
                    {expensesByCategory.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={colors.charts[index % colors.charts.length]}
                      />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    content={<CustomTooltip />}
                    formatter={(value, name) => [`₹${value.toLocaleString()}`, name]}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    formatter={(value, entry) => (
                      <span style={{ color: entry.color }}>
                        {value} (₹{entry.payload.value.toLocaleString()})
                      </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center', 
                justifyContent: 'center', 
                height: '100%',
                color: 'text.secondary'
              }}>
                <PieChartIcon sx={{ fontSize: 64, mb: 2, opacity: 0.3 }} />
                <Typography variant="h6">No expense data available</Typography>
                <Typography variant="body2">Add some transactions to see the breakdown</Typography>
              </Box>
            )}
          </ChartCard>
        </Grid>

        {/* Enhanced Bar Chart */}
        <Grid item xs={12} lg={6}>
          <ChartCard 
            title="Monthly Comparison" 
            icon={<BarChartIcon />}
            height={400}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.3)} />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: theme.palette.text.secondary }}
                  axisLine={{ stroke: alpha(theme.palette.divider, 0.5) }}
                />
                <YAxis 
                  tick={{ fill: theme.palette.text.secondary }}
                  axisLine={{ stroke: alpha(theme.palette.divider, 0.5) }}
                />
                <RechartsTooltip content={<CustomTooltip />} />
                <Legend />
                <Bar 
                  dataKey="income" 
                  fill={colors.success}
                  name="Income"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="expenses" 
                  fill={colors.error}
                  name="Expenses"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="savings" 
                  fill={colors.primary}
                  name="Savings"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        {/* Enhanced Area Chart */}
        <Grid item xs={12}>
          <ChartCard 
            title="Income vs Expenses Trend" 
            icon={<LineChartIcon />}
            height={400}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors.success} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={colors.success} stopOpacity={0.05}/>
                  </linearGradient>
                  <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors.error} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={colors.error} stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.3)} />
                <XAxis 
                  dataKey="month"
                  tick={{ fill: theme.palette.text.secondary }}
                  axisLine={{ stroke: alpha(theme.palette.divider, 0.5) }}
                />
                <YAxis 
                  tick={{ fill: theme.palette.text.secondary }}
                  axisLine={{ stroke: alpha(theme.palette.divider, 0.5) }}
                />
                <RechartsTooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke={colors.success}
                  strokeWidth={3}
                  fill="url(#incomeGradient)"
                  name="Income"
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stroke={colors.error}
                  strokeWidth={3}
                  fill="url(#expenseGradient)"
                  name="Expenses"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        {/* Category Breakdown Table/List */}
        <Grid item xs={12}>
          <Card elevation={0} sx={{ border: `1px solid ${alpha(theme.palette.divider, 0.2)}` }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <FilterIcon sx={{ mr: 1 }} />
                Category Breakdown
              </Typography>
              <Grid container spacing={2}>
                {expensesByCategory.map((category, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Box
                      sx={{
                        p: 2,
                        border: `1px solid ${alpha(colors.charts[index % colors.charts.length], 0.3)}`,
                        borderRadius: 2,
                        backgroundColor: alpha(colors.charts[index % colors.charts.length], 0.05),
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          backgroundColor: alpha(colors.charts[index % colors.charts.length], 0.1),
                          transform: 'translateY(-2px)'
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {category.name}
                        </Typography>
                        <Chip
                          label={`${category.percentage}%`}
                          size="small"
                          sx={{
                            backgroundColor: colors.charts[index % colors.charts.length],
                            color: 'white',
                            fontWeight: 600
                          }}
                        />
                      </Box>
                      <Typography variant="h6" sx={{ mt: 1, color: colors.charts[index % colors.charts.length] }}>
                        ₹{category.value.toLocaleString()}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Reports;