import React from 'react';
import { Card, CardContent, Box, Typography } from '@mui/material';
import { formatCurrency } from '../../utils/helpers';

const SummaryCard = ({ title, amount, icon, color = 'primary' }) => {
  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center">
          {React.cloneElement(icon, { color })}
          <Box ml={2}>
            <Typography color="textSecondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h5" color={color + '.main'}>
              {formatCurrency(amount)}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;