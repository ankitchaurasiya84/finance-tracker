import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const ChartCard = ({ title, children, height = 300 }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <div style={{ height }}>
          {children}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartCard;