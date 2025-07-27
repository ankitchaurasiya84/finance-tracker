import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const NotificationSnackbar = ({ snackbar, setSnackbar }) => {
  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Snackbar 
      open={snackbar.open} 
      autoHideDuration={6000} 
      onClose={handleClose}
    >
      <Alert 
        onClose={handleClose} 
        severity={snackbar.severity}
        sx={{ width: '100%' }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};

export default NotificationSnackbar;