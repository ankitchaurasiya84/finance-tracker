
import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Box,
  Tooltip,
  Avatar,
  Chip,
  useScrollTrigger,
  Slide,
  Paper
} from '@mui/material';
import { 
  Menu as MenuIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  AccountBalance as AccountBalanceIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const AppHeader = ({ onMenuClick, profile = { theme: 'light' }, setProfile, showSnackbar }) => {
  const theme = useTheme();
  const [isThemeToggling, setIsThemeToggling] = useState(false);
  
  // Add scroll trigger for elevation effect
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const handleThemeChange = (event) => {
    setIsThemeToggling(true);
    const newTheme = event.target.checked ? 'dark' : 'light';
    
    setTimeout(() => {
      setProfile({ ...profile, theme: newTheme });
      showSnackbar && showSnackbar(`Switched to ${newTheme} theme`, 'success');
      setIsThemeToggling(false);
    }, 150);
  };

  const isDarkMode = profile.theme === 'dark';

  // Custom toggle switch styles (similar to Profile component)
  const switchStyle = {
    position: 'relative',
    display: 'inline-block',
    width: '52px',
    height: '28px'
  };

  const switchInputStyle = {
    opacity: 0,
    width: 0,
    height: 0
  };

  const sliderStyle = {
    position: 'absolute',
    cursor: 'pointer',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: isDarkMode ? '#3b82f6' : 'rgba(255, 255, 255, 0.3)',
    transition: '0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    borderRadius: '28px',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
  };

  const sliderBeforeStyle = {
    position: 'absolute',
    content: '""',
    height: '20px',
    width: '20px',
    left: isDarkMode ? '26px' : '2px',
    bottom: '2px',
    backgroundColor: 'white',
    transition: '0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    borderRadius: '50%',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    transform: isThemeToggling ? 'scale(1.1)' : 'scale(1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar 
        position="fixed" 
        elevation={trigger ? 8 : 2}
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backdropFilter: 'blur(10px)',
          borderBottom: `1px solid ${theme.palette.divider}20`,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
          {/* Menu Button */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onMenuClick}
            edge="start"
            sx={{ 
              mr: 2,
              p: 1.5,
              borderRadius: 2,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                transform: 'scale(1.05)',
                transition: 'all 0.2s ease-in-out'
              }
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* App Title */}
          <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
            <Avatar
              sx={{
                mr: 2,
                width: 40,
                height: 40,
                background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
              }}
            >
              <AccountBalanceIcon />
            </Avatar>
            <Box>
              <Typography 
                variant="h6" 
                noWrap 
                component="div"
                sx={{ 
                  fontWeight: 700,
                  color: 'white',
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                Personal Finance Tracker
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.7)',
                  display: { xs: 'none', md: 'block' }
                }}
              >
                Manage your finances smartly
              </Typography>
            </Box>
          </Box>

          {/* Theme Status Chip */}
         

          {/* Custom Theme Toggle */}
          <Tooltip 
            title={`Switch to ${isDarkMode ? 'Light' : 'Dark'} Mode`}
            arrow
            placement="bottom"
          >
            
            <Paper
              elevation={0}
              sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 3,
                border: '1px solid rgba(255, 255, 255, 0.2)',
                p: 1,
                gap: 1,
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  transform: 'scale(1.02)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                }
              }}
            >
            <Chip
            icon={isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
            label={isDarkMode ? 'Dark' : 'Light'}
            size="small"
            sx={{
              mr: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              fontWeight: 500,
              display: { xs: 'none', sm: 'flex' },
              '& .MuiChip-icon': {
                color: 'white'
              }
            }}
          />

              {/* Custom Toggle Switch */}
              <label style={switchStyle}>
                <input
                  type="checkbox"
                  checked={isDarkMode}
                  onChange={handleThemeChange}
                  disabled={isThemeToggling}
                  style={switchInputStyle}
                />
                <span style={sliderStyle}>
                  <span style={sliderBeforeStyle}></span>
                </span>
              </label>

            
            </Paper>
          </Tooltip>

         
        </Toolbar>
      </AppBar>
    </Slide>
  );
};

export default AppHeader;