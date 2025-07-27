// import React, { useState } from 'react';
// import { ThemeProvider, CssBaseline, Box } from '@mui/material';
// import { lightTheme, darkTheme } from './themes/themes';
// import { useLocalStorage } from './utils/localStorage';
// import { initialData } from './utils/dummyData';
// import AppLayout from './components/layout/AppLayout';
// import Dashboard from './pages/Dashboard';
// import Transactions from './pages/Transactions';
// import Budgets from './pages/Budgets';
// import Reports from './pages/Reports';
// import Profile from './pages/Profile';
// import Chatbot from './components/chatbot/Chatbot';
// import NotificationSnackbar from './components/common/NotificationSnackbar';

// const App = () => {
//   const [currentPage, setCurrentPage] = useState('dashboard');
//   const [transactions, setTransactions] = useLocalStorage('transactions', initialData.transactions);
//   const [budgets, setBudgets] = useLocalStorage('budgets', initialData.budgets);
//   const [profile, setProfile] = useLocalStorage('profile', initialData.profile);
//   const [chatbotOpen, setChatbotOpen] = useState(false);
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

//   const theme = profile.theme === 'dark' ? darkTheme : lightTheme;

//   const showSnackbar = (message, severity = 'success') => {
//     setSnackbar({ open: true, message, severity });
//   };

//   const appState = {
//     transactions,
//     setTransactions,
//     budgets,
//     setBudgets,
//     profile,
//     setProfile,
//     showSnackbar
//   };

//   const renderCurrentPage = () => {
//     switch (currentPage) {
//       case 'dashboard': return <Dashboard {...appState} />;
//       case 'transactions': return <Transactions {...appState} />;
//       case 'budgets': return <Budgets {...appState} />;
//       case 'reports': return <Reports {...appState} />;
//       case 'profile': return <Profile {...appState} />;
//       default: return <Dashboard {...appState} />;
//     }
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <AppLayout 
//         currentPage={currentPage} 
//         setCurrentPage={setCurrentPage}
//         setChatbotOpen={setChatbotOpen}
//         // Pass these props so AppLayout can pass them to AppHeader
//         profile={profile}
//         setProfile={setProfile}
//         showSnackbar={showSnackbar}
//       >
//         {renderCurrentPage()}
//       </AppLayout>

//       <Chatbot 
//         open={chatbotOpen}
//         onClose={() => setChatbotOpen(false)}
//         appState={appState}
//       />

//       <NotificationSnackbar 
//         snackbar={snackbar}
//         setSnackbar={setSnackbar}
//       />
//     </ThemeProvider>
//   );
// };

// export default App;

import React, { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './themes/themes';
import { useLocalStorage } from './utils/localStorage';
import { initialData } from './utils/dummyData';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Budgets from './pages/Budgets';
import Reports from './pages/Reports';
import Profile from './pages/Profile';
import Chatbot from './components/chatbot/Chatbot';
import NotificationSnackbar from './components/common/NotificationSnackbar';

const App = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [transactions, setTransactions] = useLocalStorage('transactions', initialData.transactions);
  const [budgets, setBudgets] = useLocalStorage('budgets', initialData.budgets);
  const [profile, setProfile] = useLocalStorage('profile', initialData.profile);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false); // Add minimize state
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const theme = profile.theme === 'dark' ? darkTheme : lightTheme;

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const appState = {
    transactions,
    setTransactions,
    budgets,
    setBudgets,
    profile,
    setProfile,
    showSnackbar
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard {...appState} />;
      case 'transactions': return <Transactions {...appState} />;
      case 'budgets': return <Budgets {...appState} />;
      case 'reports': return <Reports {...appState} />;
      case 'profile': return <Profile {...appState} />;
      default: return <Dashboard {...appState} />;
    }
  };

  // Handle chatbot close - also reset minimize state
  const handleChatbotClose = () => {
    setChatbotOpen(false);
    setIsMinimized(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppLayout 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        setChatbotOpen={setChatbotOpen}
        profile={profile}
        setProfile={setProfile}
        showSnackbar={showSnackbar}
        // Pass chatbot state for minimize functionality
        chatbotOpen={chatbotOpen}
        isMinimized={isMinimized}
        setIsMinimized={setIsMinimized}
      >
        {renderCurrentPage()}
      </AppLayout>

      {/* Enhanced Chatbot with minimize support */}
      <Chatbot 
        open={chatbotOpen}
        onClose={handleChatbotClose}
        appState={appState}
        isMinimized={isMinimized}
        setIsMinimized={setIsMinimized}
      />

      <NotificationSnackbar 
        snackbar={snackbar}
        setSnackbar={setSnackbar}
      />
    </ThemeProvider>
  );
};

export default App;