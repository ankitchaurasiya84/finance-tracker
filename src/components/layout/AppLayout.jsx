// // // import React from 'react';
// // // import { Box, Fab } from '@mui/material';
// // // import { Chat } from '@mui/icons-material';
// // // import AppHeader from './AppHeader';
// // // import Sidebar from './Sidebar';

// // // const AppLayout = ({ currentPage, setCurrentPage, setChatbotOpen, children }) => {
// // //   return (
// // //     <Box sx={{ display: 'flex' }}>
// // //       <AppHeader />
// // //       <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
// // //       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
// // //         <Box sx={{ height: 64 }} /> {/* Toolbar spacer */}
// // //         {children}
// // //       </Box>

// // //       {/* Floating Chatbot Button */}
// // //       <Fab
// // //         color="primary"
// // //         sx={{ position: 'fixed', bottom: 16, right: 16 }}
// // //         onClick={() => setChatbotOpen(true)}
// // //       >
// // //         <Chat />
// // //       </Fab>
// // //     </Box>
// // //   );
// // // };

// // // export default AppLayout;

// // import React, { useState } from 'react';
// // import { Box, Fab, useTheme, useMediaQuery } from '@mui/material';
// // import { Chat } from '@mui/icons-material';
// // import AppHeader from './AppHeader';
// // import Sidebar from './Sidebar';

// // const AppLayout = ({ currentPage, setCurrentPage, setChatbotOpen, children }) => {
// //   const [sidebarOpen, setSidebarOpen] = useState(false);
// //   const theme = useTheme();
// //   const isMobile = useMediaQuery(theme.breakpoints.down('md'));

// //   const handleMenuClick = () => {
// //     setSidebarOpen(!sidebarOpen);
// //   };

// //   const handleDrawerClose = () => {
// //     setSidebarOpen(false);
// //   };

// //   return (
// //     <Box sx={{ display: 'flex' }}>
// //       <AppHeader onMenuClick={handleMenuClick}/>
// //       <Sidebar 
// //         currentPage={currentPage} 
// //         setCurrentPage={setCurrentPage}
// //         open={sidebarOpen}
// //         onClose={handleDrawerClose}
// //       />
// //       <Box 
// //         component="main" 
// //         sx={{ 
// //           flexGrow: 1, 
// //           p: 3,
// //           transition: theme.transitions.create('margin', {
// //             easing: theme.transitions.easing.sharp,
// //             duration: theme.transitions.duration.leavingScreen,
// //           }),
// //           marginLeft: !isMobile && sidebarOpen ? 0 : 0,
// //         }}
// //       >
// //         <Box sx={{ height: 64 }} /> {/* Toolbar spacer */}
// //         {children}
// //       </Box>
// //       {/* Floating Chatbot Button */}
// //       <Fab
// //         color="primary"
// //         sx={{ position: 'fixed', bottom: 16, right: 16 }}
// //         onClick={() => setChatbotOpen(true)}
// //       >
// //         <Chat />
// //       </Fab>
// //     </Box>
// //   );
// // };

// // export default AppLayout;

// import React, { useState } from 'react';
// import { Box, Fab, useTheme, useMediaQuery } from '@mui/material';
// import { Chat } from '@mui/icons-material';
// import AppHeader from './AppHeader';
// import Sidebar from './Sidebar';

// const AppLayout = ({ 
//   currentPage, 
//   setCurrentPage, 
//   setChatbotOpen, 
//   children,
//   // Add these props to receive theme state from App.js
//   profile,
//   setProfile,
//   showSnackbar
// }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));

//   const handleMenuClick = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   const handleDrawerClose = () => {
//     setSidebarOpen(false);
//   };

//   // Close sidebar when navigating on mobile
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     if (isMobile) {
//       setSidebarOpen(false);
//     }
//   };

//   return (
//     <Box sx={{ display: 'flex' }}>
//       {/* Enhanced AppHeader with theme toggle support */}
//       <AppHeader 
//         onMenuClick={handleMenuClick}
//         profile={profile}
//         setProfile={setProfile}
//         showSnackbar={showSnackbar}
//       />
      
//       {/* Sidebar with proper integration */}
//       <Sidebar
//         currentPage={currentPage}
//         setCurrentPage={handlePageChange}
//         open={sidebarOpen}
//         onClose={handleDrawerClose}
//         isMobile={isMobile}
//       />
      
//       {/* Main Content Area */}
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 3,
//           transition: theme.transitions.create('margin', {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.leavingScreen,
//           }),
//           marginLeft: !isMobile && sidebarOpen ? 0 : 0,
//           // Add proper spacing and background
//           minHeight: '100vh',
//           backgroundColor: theme.palette.background.default,
//           // Responsive padding
//           px: { xs: 2, sm: 3 },
//           py: 3,
//         }}
//       >
//         {/* Toolbar spacer */}
//         <Box sx={{ height: 64 }} />
        
//         {/* Page Content */}
//         <Box
//           sx={{
//             // Add subtle background for content area
//             backgroundColor: theme.palette.mode === 'dark' 
//               ? 'rgba(255, 255, 255, 0.02)' 
//               : 'rgba(0, 0, 0, 0.01)',
//             borderRadius: 2,
//             minHeight: 'calc(100vh - 120px)',
//             transition: 'all 0.3s ease-in-out',
//           }}
//         >
//           {children}
//         </Box>
//       </Box>

//       {/* Enhanced Floating Chatbot Button */}
//       <Fab
//         color="primary"
//         size={isMobile ? "medium" : "large"}
//         sx={{ 
//           position: 'fixed', 
//           bottom: { xs: 16, sm: 24 }, 
//           right: { xs: 16, sm: 24 },
//           background: theme.palette.mode === 'dark'
//             ? 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
//             : 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
//           boxShadow: theme.palette.mode === 'dark'
//             ? '0 8px 32px rgba(33, 150, 243, 0.3)'
//             : '0 8px 32px rgba(25, 118, 210, 0.3)',
//           transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//           '&:hover': {
//             transform: 'scale(1.1) translateY(-2px)',
//             boxShadow: theme.palette.mode === 'dark'
//               ? '0 12px 40px rgba(33, 150, 243, 0.4)'
//               : '0 12px 40px rgba(25, 118, 210, 0.4)',
//             background: theme.palette.mode === 'dark'
//               ? 'linear-gradient(45deg, #1976d2 30%, #1e88e5 90%)'
//               : 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
//           },
//           '&:active': {
//             transform: 'scale(1.05) translateY(-1px)',
//           },
//           // Adjust z-index to appear above everything
//           zIndex: theme.zIndex.fab,
//         }}
//         onClick={() => setChatbotOpen(true)}
//         aria-label="Open chat"
//       >
//         <Chat sx={{ 
//           fontSize: isMobile ? 24 : 28,
//           transition: 'transform 0.2s ease-in-out',
//         }} />
//       </Fab>

//       {/* Overlay for mobile when sidebar is open */}
//       {isMobile && sidebarOpen && (
//         <Box
//           sx={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//             zIndex: theme.zIndex.drawer - 1,
//             backdropFilter: 'blur(2px)',
//           }}
//           onClick={handleDrawerClose}
//         />
//       )}
//     </Box>
//   );
// };

// export default AppLayout;

import React, { useState } from 'react';
import { Box, Fab, useTheme, useMediaQuery } from '@mui/material';
import { Chat } from '@mui/icons-material';
import AppHeader from './AppHeader';
import Sidebar from './Sidebar';

const AppLayout = ({ 
  currentPage, 
  setCurrentPage, 
  setChatbotOpen, 
  children,
  profile,
  setProfile,
  showSnackbar,
  // Add these for chatbot minimize functionality
  chatbotOpen,
  isMinimized,
  setIsMinimized
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleDrawerClose = () => {
    setSidebarOpen(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const handleChatbotOpen = () => {
    if (isMinimized) {
      setIsMinimized(false);
    } else {
      setChatbotOpen(true);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppHeader 
        onMenuClick={handleMenuClick}
        profile={profile}
        setProfile={setProfile}
        showSnackbar={showSnackbar}
      />
      
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={handlePageChange}
        open={sidebarOpen}
        onClose={handleDrawerClose}
        isMobile={isMobile}
      />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          marginLeft: !isMobile && sidebarOpen ? 0 : 0,
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default,
          px: { xs: 2, sm: 3 },
          py: 3,
        }}
      >
        <Box sx={{ height: 64 }} />
        
        <Box
          sx={{
            backgroundColor: theme.palette.mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.02)' 
              : 'rgba(0, 0, 0, 0.01)',
            borderRadius: 2,
            minHeight: 'calc(100vh - 120px)',
            transition: 'all 0.3s ease-in-out',
          }}
        >
          {children}
        </Box>
      </Box>

      {/* Enhanced Floating Chatbot Button - Only show when not open or minimized */}
      {(!chatbotOpen || isMinimized) && (
        <Fab
          color="primary"
          size={isMobile ? "medium" : "large"}
          sx={{ 
            position: 'fixed', 
            bottom: { xs: 16, sm: 24 }, 
            right: { xs: 16, sm: 24 },
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
              : 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
            boxShadow: theme.palette.mode === 'dark'
              ? '0 8px 32px rgba(33, 150, 243, 0.3)'
              : '0 8px 32px rgba(25, 118, 210, 0.3)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'scale(1.1) translateY(-2px)',
              boxShadow: theme.palette.mode === 'dark'
                ? '0 12px 40px rgba(33, 150, 243, 0.4)'
                : '0 12px 40px rgba(25, 118, 210, 0.4)',
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(45deg, #1976d2 30%, #1e88e5 90%)'
                : 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
            },
            '&:active': {
              transform: 'scale(1.05) translateY(-1px)',
            },
            zIndex: theme.zIndex.fab,
          }}
          onClick={handleChatbotOpen}
          aria-label="Open chat"
        >
          <Chat sx={{ 
            fontSize: isMobile ? 24 : 28,
            transition: 'transform 0.2s ease-in-out',
          }} />
        </Fab>
      )}

      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: theme.zIndex.drawer - 1,
            backdropFilter: 'blur(2px)',
          }}
          onClick={handleDrawerClose}
        />
      )}
    </Box>
  );
};

export default AppLayout;