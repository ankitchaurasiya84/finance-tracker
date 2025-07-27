

import React from 'react';
import { 
  Drawer, 
  Toolbar, 
  Box, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  AccountBalance,
  Category,
  Assessment,
  Person
} from '@mui/icons-material';

const Sidebar = ({ currentPage, setCurrentPage, open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { id: 'transactions', label: 'Transactions', icon: <AccountBalance /> },
    { id: 'budgets', label: 'Budgets', icon: <Category /> },
    { id: 'reports', label: 'Reports', icon: <Assessment /> },
    { id: 'profile', label: 'Profile', icon: <Person /> }
  ];

  const handleItemClick = (itemId) => {
    setCurrentPage(itemId);
    // Close drawer on mobile after selection
    if (isMobile) {
      onClose();
    }
  };

  const drawerContent = (
    <>
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {navigation.map((item) => (
            <ListItem
              button
              key={item.id}
              selected={currentPage === item.id}
              onClick={() => handleItemClick(item.id)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );

  return (
    <>
      {/* Mobile Drawer */}
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={open}
          onClose={onClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              width: 240, 
              boxSizing: 'border-box' 
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        /* Desktop Drawer */
        <Drawer
          variant="persistent"
          open={open}
          sx={{
            display: { xs: 'none', md: 'block' },
            width: open ? 240 : 0,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 240,
              boxSizing: 'border-box',
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;