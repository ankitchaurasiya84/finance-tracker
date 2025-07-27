// import React from 'react';
// import { Card, CardContent, Box, Typography, LinearProgress } from '@mui/material';
// import { Warning } from '@mui/icons-material';

// const BudgetCard = ({ budget }) => {
//   const percentage = (budget.spent / budget.budget) * 100;
//   const isOverBudget = percentage > 100;
  
//   return (
//     <Card>
//       <CardContent>
//         <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//           <Typography variant="h6">{budget.category}</Typography>
//           {isOverBudget && <Warning color="error" />}
//         </Box>
        
//         <Box mb={2}>
//           <Typography variant="body2" color="textSecondary">
//             ₹{budget.spent} of ₹{budget.budget} spent
//           </Typography>
//           <LinearProgress 
//             variant="determinate" 
//             value={Math.min(percentage, 100)} 
//             color={isOverBudget ? 'error' : percentage > 80 ? 'warning' : 'primary'}
//             sx={{ mt: 1 }}
//           />
//         </Box>
        
//         <Typography 
//           variant="body2" 
//           color={isOverBudget ? 'error' : 'textSecondary'}
//         >
//           {percentage.toFixed(1)}% used
//           {isOverBudget && ` (Over by ₹${(budget.spent - budget.budget).toFixed(2)})`}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// };

// export default BudgetCard;

import React from 'react';
import { 
  Card, 
  CardContent, 
  Box, 
  Typography, 
  LinearProgress, 
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  Fade
} from '@mui/material';
import { 
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  TrendingUp as TrendingUpIcon,
  Edit as EditIcon,
  Category as CategoryIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const BudgetCard = ({ budget, onEdit }) => {
  const theme = useTheme();
  const percentage = (budget.spent / budget.budget) * 100;
  const isOverBudget = percentage > 100;
  const isNearLimit = percentage > 80 && percentage <= 100;
  const remainingBudget = budget.budget - budget.spent;

  const getStatusColor = () => {
    if (isOverBudget) return theme.palette.error.main;
    if (isNearLimit) return theme.palette.warning.main;
    return theme.palette.success.main;
  };

  const getStatusIcon = () => {
    if (isOverBudget) return <WarningIcon />;
    if (isNearLimit) return <WarningIcon />;
    return <CheckCircleIcon />;
  };

  const getProgressColor = () => {
    if (isOverBudget) return 'error';
    if (isNearLimit) return 'warning';
    return 'success';
  };

  const getCategoryIcon = (category) => {
    // You can customize these icons based on category
    const iconMap = {
      'Food': '🍽️',
      'Transport': '🚗',
      'Entertainment': '🎬',
      'Shopping': '🛍️',
      'Healthcare': '🏥',
      'Education': '📚',
      'Utilities': '💡',
      'Other': '📦'
    };
    return iconMap[category] || '📦';
  };

  return (
    <Fade in={true} timeout={500}>
      <Card
        sx={{
          position: 'relative',
          borderRadius: 3,
          overflow: 'hidden',
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #1e1e2e 0%, #2a2a3e 100%)'
            : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          border: `1px solid ${theme.palette.divider}`,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme.palette.mode === 'dark'
              ? '0 12px 40px rgba(0, 0, 0, 0.4)'
              : '0 12px 40px rgba(0, 0, 0, 0.1)',
            border: `1px solid ${getStatusColor()}40`,
          }
        }}
      >
        {/* Status Indicator Bar */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: `linear-gradient(90deg, ${getStatusColor()} 0%, ${getStatusColor()}80 100%)`
          }}
        />

        <CardContent sx={{ p: 3 }}>
          {/* Header Section */}
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar
                sx={{
                  width: 48,
                  height: 48,
                  backgroundColor: `${getStatusColor()}20`,
                  fontSize: '1.5rem'
                }}
              >
                {getCategoryIcon(budget.category)}
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight="600" gutterBottom>
                  {budget.category}
                </Typography>
                <Chip
                  icon={getStatusIcon()}
                  label={
                    isOverBudget ? 'Over Budget' : 
                    isNearLimit ? 'Near Limit' : 
                    'On Track'
                  }
                  size="small"
                  sx={{
                    backgroundColor: `${getStatusColor()}15`,
                    color: getStatusColor(),
                    fontWeight: 500,
                    '& .MuiChip-icon': {
                      color: getStatusColor()
                    }
                  }}
                />
              </Box>
            </Box>
            
            {onEdit && (
              <Tooltip title="Edit Budget">
                <IconButton
                  onClick={() => onEdit(budget)}
                  size="small"
                  sx={{
                    color: 'text.secondary',
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                      color: theme.palette.primary.main
                    }
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Box>

          {/* Amount Section */}
          <Box mb={3}>
            <Box display="flex" justifyContent="space-between" alignItems="baseline" mb={1}>
              <Typography variant="body2" color="text.secondary">
                Spent
              </Typography>
              <Typography variant="h5" fontWeight="700" color={getStatusColor()}>
                ₹{budget.spent.toLocaleString()}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="baseline">
              <Typography variant="body2" color="text.secondary">
                Budget
              </Typography>
              <Typography variant="body1" fontWeight="500" color="text.primary">
                ₹{budget.budget.toLocaleString()}
              </Typography>
            </Box>
          </Box>

          {/* Progress Section */}
          <Box mb={2}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="body2" color="text.secondary">
                Progress
              </Typography>
              <Typography 
                variant="body2" 
                fontWeight="600"
                color={getStatusColor()}
              >
                {percentage.toFixed(1)}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={Math.min(percentage, 100)}
              color={getProgressColor()}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: theme.palette.mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.1)' 
                  : 'rgba(0, 0, 0, 0.1)',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 4,
                  background: isOverBudget 
                    ? `linear-gradient(90deg, ${theme.palette.error.main} 0%, ${theme.palette.error.dark} 100%)`
                    : isNearLimit
                    ? `linear-gradient(90deg, ${theme.palette.warning.main} 0%, ${theme.palette.warning.dark} 100%)`
                    : `linear-gradient(90deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`
                }
              }}
            />
          </Box>

          {/* Status Message */}
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              backgroundColor: theme.palette.mode === 'dark' 
                ? `${getStatusColor()}15` 
                : `${getStatusColor()}08`,
              border: `1px solid ${getStatusColor()}30`
            }}
          >
            {isOverBudget ? (
              <Box display="flex" alignItems="center" gap={1}>
                <WarningIcon sx={{ color: getStatusColor(), fontSize: 20 }} />
                <Typography variant="body2" color={getStatusColor()} fontWeight="500">
                  Over budget by ₹{Math.abs(remainingBudget).toLocaleString()}
                </Typography>
              </Box>
            ) : (
              <Box display="flex" alignItems="center" gap={1}>
                <TrendingUpIcon sx={{ color: getStatusColor(), fontSize: 20 }} />
                <Typography variant="body2" color={getStatusColor()} fontWeight="500">
                  ₹{remainingBudget.toLocaleString()} remaining
                </Typography>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    </Fade>
  );
};

export default BudgetCard;