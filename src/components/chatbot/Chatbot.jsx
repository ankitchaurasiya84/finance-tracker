import React, { useState, useRef, useEffect } from 'react';
import OpenAI from 'openai';
import {
  Dialog,
  Box,
  Typography,
  Paper,
  TextField,
  IconButton,
  Avatar,
  Chip,
  Fade,
  CircularProgress,
  Tooltip,
  InputAdornment,
  Slide
} from '@mui/material';
import {
  Close as CloseIcon,
  Minimize as MinimizeIcon,
  Send as SendIcon,
  SmartToy as BotIcon,
  Person as UserIcon,
  Psychology as PsychologyIcon,
  TrendingUp as TrendingUpIcon,
  AccountBalance as AccountBalanceIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { categories } from '../../utils/dummyData';
import {initialData} from '../../utils/dummyData';
import { calculateTotalIncome, calculateTotalExpense, calculateBalance } from '../../utils/helpers';
let API_KEY_OPENAI=import.meta.env.VITE_OPENAI_API_KEY


// Initialize OpenAI client for development
const openai = new OpenAI({
  apiKey: API_KEY_OPENAI,
  dangerouslyAllowBrowser: true // Required for client-side usage in development
});

const Chatbot = ({ open, onClose, appState, isMinimized, setIsMinimized }) => {
  const theme = useTheme();
  const { transactions, budgets, profile } = appState;
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! I\'m your AI-powered personal finance assistant. I can analyze your spending patterns, provide savings advice, and help you make better financial decisions. What would you like to know about your finances?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [apiKeyStatus, setApiKeyStatus] = useState('checking');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const isDark = profile?.theme === 'dark';

  // Check API key status on component mount
  useEffect(() => {
const apiKey = API_KEY_OPENAI
    if (!apiKey) {
      setApiKeyStatus('missing');
      console.error('OpenAI API key not found. Please add API_KEY to your .env file');
    } else if (!apiKey.startsWith('sk-')) {
      setApiKeyStatus('invalid');
      console.error('OpenAI API key appears to be invalid. It should start with "sk-"');
    } else {
      setApiKeyStatus('valid');
      console.log('OpenAI API key loaded successfully');
    }
  }, []);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when dialog opens
  useEffect(() => {
    if (open && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, isMinimized]);

  // Calculate financial data for context
  const totalIncome = calculateTotalIncome(transactions);
  const totalExpense = calculateTotalExpense(transactions);
  const balance = calculateBalance(transactions);

  // Prepare financial context for AI
  const getFinancialContext = () => {
    const categorySpending = categories.map(cat => {
      const spent = transactions
        .filter(t => t.type === 'expense' && t.category === cat)
        .reduce((sum, t) => sum + t.amount, 0);
      return { category: cat, spent };
    }).sort((a, b) => b.spent - a.spent);

    const budgetStatus = budgets.map(b => ({
      category: b.category,
      budget: b.budget,
      spent: b.spent,
      remaining: b.budget - b.spent,
      percentage: (b.spent / b.budget) * 100
    }));

    const recentTransactions = transactions
      .slice(-5) // Limit to last 5 transactions to save tokens
      .map(t => ({
        type: t.type,
        amount: t.amount,
        category: t.category,
        description: t.description,
        date: t.date
      }));

    return {
      totalIncome,
      totalExpense,
      balance,
      categorySpending: categorySpending.slice(0, 10), // Limit categories
      budgetStatus,
      recentTransactions,
      transactionCount: transactions.length,
      budgetCount: budgets.length,
      CurrentCurrency:initialData.profile.currency
    };
  };

  // Create system message with financial context
  const createSystemMessage = (context) => {
    return `You are a professional personal finance advisor AI assistant. Analyze the user's financial data and provide helpful advice.

FINANCIAL OVERVIEW:
- Total Income: $${context.totalIncome.toFixed(2)}
- Total Expenses: $${context.totalExpense.toFixed(2)}
- Current Balance: $${context.balance.toFixed(2)}
- Number of Transactions: ${context.transactionCount}
- Number of Budgets: ${context.budgetCount}
- all data in ${context.CurrentCurrency}
TOP SPENDING CATEGORIES:
${context.categorySpending.slice(0, 5).map(cat => `- ${cat.category}: $${cat.spent.toFixed(2)}`).join('\n')}

BUDGET STATUS:
${context.budgetStatus.map(b => `- ${b.category}: $${b.spent.toFixed(2)} / $${b.budget.toFixed(2)} (${b.percentage.toFixed(1)}% used)`).join('\n')}

RECENT TRANSACTIONS (last 5):
${context.recentTransactions.map(t => `- ${t.type}: $${t.amount.toFixed(2)} - ${t.category} - ${t.description || 'No description'}`).join('\n')}

Please provide:
1. Personalized financial advice based on this data
2. Specific, actionable recommendations
3. Encouraging and supportive tone
4. Keep responses concise (under 150 words)
5. Use specific numbers from their data when relevant
6. Focus on practical steps they can take

Do NOT provide specific investment advice - only general educational information.`;
  };

  // Call OpenAI API with comprehensive error handling
  const callOpenAI = async (userMessage, context) => {
    // Check API key before making request
    if (apiKeyStatus !== 'valid') {
      throw new Error('OpenAI API key is not properly configured. Please check your .env file.');
    }

    try {
      const systemMessage = createSystemMessage(context);
      
      // Prepare conversation history (limit to last 3 exchanges to save tokens)
      const conversationHistory = messages.slice(-6).map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      console.log('Sending request to OpenAI...');
      
      const completion = await openai.chat.completions.create({
        model: "gpt-4o", // Cost-effective choice for development
        messages: [
          { role: "system", content: systemMessage },
          ...conversationHistory,
          { role: "user", content: userMessage }
        ],
        max_tokens: 200, // Limit tokens for cost control
        temperature: 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1,
        user: `dev_user_${Date.now()}` // For development tracking
      });

      console.log('OpenAI response received. Tokens used:', completion.usage?.total_tokens || 'unknown');
      
      return completion.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      
      // Handle different types of errors with user-friendly messages
      if (error.status === 401) {
        throw new Error('Invalid API key. Please check your OpenAI API key in the .env file.');
      } else if (error.status === 429) {
        throw new Error('Rate limit exceeded. Please wait a moment and try again.');
      } else if (error.status === 400) {
        throw new Error('Invalid request. Please try rephrasing your question.');
      } else if (error.code === 'insufficient_quota') {
        throw new Error('OpenAI quota exceeded. Please check your OpenAI account billing.');
      } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Network error. Please check your internet connection.');
      } else {
        throw new Error(`Unable to get AI response: ${error.message || 'Unknown error'}`);
      }
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    // Check API key status before sending
    if (apiKeyStatus !== 'valid') {
      const errorMessage = {
        role: 'assistant',
        content: 'OpenAI API key is not properly configured. Please add your API key to the .env file and restart the development server.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      return;
    }

    const userMessage = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      const context = getFinancialContext();
      const response = await callOpenAI(input.trim(), context);

      const assistantMessage = {
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setIsTyping(false);
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error in handleSend:', error);
      
      const errorMessage = {
        role: 'assistant',
        content: `I apologize, but I encountered an error: ${error.message}. Please try again.`,
        timestamp: new Date()
      };
      
      setIsTyping(false);
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const clearConversation = () => {
    setMessages([{
      role: 'assistant',
      content: 'Conversation cleared! How can I help you with your finances today?',
      timestamp: new Date()
    }]);
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const quickActions = [
    { label: 'Spending Analysis', icon: <TrendingUpIcon />, query: 'Analyze my spending patterns and give me specific advice' },
    { label: 'Budget Review', icon: <AccountBalanceIcon />, query: 'How are my budgets performing? What should I adjust?' },
    { label: 'Savings Tips', icon: <PsychologyIcon />, query: 'Give me 3 practical ways to save money based on my spending' },
    { label: 'Financial Health', icon: <TrendingUpIcon />, query: 'How is my overall financial health? What are my priorities?' }
  ];

  // Show API key status in development
 

  // Minimized state component
  if (isMinimized) {
    return (
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Paper
          elevation={8}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            width: 300,
            height: 60,
            display: 'flex',
            alignItems: 'center',
            px: 2,
            cursor: 'pointer',
            background: isDark
              ? 'linear-gradient(135deg, #1e1e2e 0%, #2a2a3e 100%)'
              : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 3,
            zIndex: theme.zIndex.fab,
            '&:hover': {
              transform: 'scale(1.02)',
              boxShadow: theme.palette.mode === 'dark'
                ? '0 8px 32px rgba(33, 150, 243, 0.3)'
                : '0 8px 32px rgba(25, 118, 210, 0.3)',
            }
          }}
          onClick={handleMinimize}
        >
          <Avatar
            sx={{
              width: 36,
              height: 36,
              background: apiKeyStatus === 'valid' 
                ? 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
                : 'linear-gradient(45deg, #f44336 30%, #ff9800 90%)',
              mr: 2
            }}
          >
            <BotIcon />
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle2" fontWeight="600">
              AI Finance Assistant
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {apiKeyStatus === 'valid' ? 'Click to expand' : 'API key needed'}
            </Typography>
          </Box>
          <IconButton size="small" onClick={(e) => { e.stopPropagation(); onClose(); }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Paper>
      </Slide>
    );
  }

  return (
    <Dialog
      open={open && !isMinimized}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          height: '80vh',
          maxHeight: '700px',
          borderRadius: 3,
          background: isDark
            ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
            : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          border: `1px solid ${theme.palette.divider}`,
          overflow: 'hidden'
        }
      }}
      TransitionComponent={Fade}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          background: apiKeyStatus === 'valid'
            ? isDark
              ? 'linear-gradient(135deg, #2196F3 0%, #21CBF3 100%)'
              : 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)'
            : 'linear-gradient(135deg, #f44336 0%, #ff9800 100%)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar
            sx={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <BotIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight="600">
              AI Finance Assistant
            </Typography>
            
          </Box>
        </Box>
        
        <Box display="flex" gap={1}>
          <Tooltip title="Clear conversation">
            <IconButton
              size="small"
              onClick={clearConversation}
              sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Minimize">
            <IconButton
              size="small"
              onClick={handleMinimize}
              sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
            >
              <MinimizeIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Close">
            <IconButton
              size="small"
              onClick={onClose}
              sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Messages Area */}
      <Box
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          p: 2,
          maxHeight: 'calc(80vh - 180px)',
          background: isDark
            ? 'rgba(255, 255, 255, 0.02)'
            : 'rgba(0, 0, 0, 0.01)',
        }}
      >
        {messages.map((message, index) => (
          <Fade key={index} in={true} timeout={300}>
            <Box
              sx={{
                mb: 2,
                display: 'flex',
                justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                alignItems: 'flex-start',
                gap: 1
              }}
            >
              {message.role === 'assistant' && (
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    mt: 0.5
                  }}
                >
                  <BotIcon fontSize="small" />
                </Avatar>
              )}
              
              <Box sx={{ maxWidth: '75%', display: 'flex', flexDirection: 'column' }}>
                <Paper
                  elevation={message.role === 'user' ? 8 : 2}
                  sx={{
                    p: 2,
                    background: message.role === 'user'
                      ? 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
                      : isDark
                        ? 'rgba(255, 255, 255, 0.05)'
                        : 'rgba(0, 0, 0, 0.02)',
                    color: message.role === 'user' ? 'white' : 'text.primary',
                    borderRadius: message.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    border: message.role === 'assistant' ? `1px solid ${theme.palette.divider}` : 'none',
                    boxShadow: message.role === 'user'
                      ? '0 4px 12px rgba(33, 150, 243, 0.3)'
                      : '0 2px 8px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <Typography variant="body2" sx={{ lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                    {message.content}
                  </Typography>
                </Paper>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    mt: 0.5,
                    ml: message.role === 'user' ? 'auto' : 0,
                    mr: message.role === 'user' ? 1 : 0
                  }}
                >
                  {formatTime(message.timestamp)}
                </Typography>
              </Box>
              
              {message.role === 'user' && (
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    background: 'linear-gradient(45deg, #FF6B6B 30%, #4ECDC4 90%)',
                    mt: 0.5
                  }}
                >
                  <UserIcon fontSize="small" />
                </Avatar>
              )}
            </Box>
          </Fade>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <Avatar
              sx={{
                width: 32,
                height: 32,
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
              }}
            >
              <BotIcon fontSize="small" />
            </Avatar>
            <Paper
              sx={{
                p: 2,
                background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: '18px 18px 18px 4px'
              }}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <CircularProgress size={16} />
                <Typography variant="body2" color="text.secondary">
                  AI is analyzing your finances...
                </Typography>
              </Box>
            </Paper>
          </Box>
        )}
        
        <div ref={messagesEndRef} />
      </Box>

      {/* Quick Actions */}
      {messages.length === 1 && apiKeyStatus === 'valid' && (
        <Box sx={{ px: 2, pb: 1 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Quick Actions:
          </Typography>
          <Box display="flex" gap={1} flexWrap="wrap">
            {quickActions.map((action, index) => (
              <Chip
                key={index}
                icon={action.icon}
                label={action.label}
                size="small"
                variant="outlined"
                clickable
                onClick={() => setInput(action.query)}
                sx={{
                  '&:hover': {
                    backgroundColor: theme.palette.primary.main,
                    color: 'white',
                    '& .MuiChip-icon': {
                      color: 'white'
                    }
                  }
                }}
              />
            ))}
          </Box>
        </Box>
      )}

      {/* Input Area */}
      <Box
        sx={{
          p: 2,
          background: isDark
            ? 'rgba(255, 255, 255, 0.02)'
            : 'rgba(0, 0, 0, 0.01)',
          borderTop: `1px solid ${theme.palette.divider}`
        }}
      >
        <TextField
          ref={inputRef}
          fullWidth
          multiline
          maxRows={3}
          placeholder={apiKeyStatus === 'valid' 
            ? "Ask me anything about your finances..." 
            : "Please configure your OpenAI API key first..."
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading || apiKeyStatus !== 'valid'}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
              backgroundColor: isDark
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(0, 0, 0, 0.02)',
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title={apiKeyStatus === 'valid' ? "Send message" : "Configure API key first"}>
                  <span>
                    <IconButton
                      onClick={handleSend}
                      disabled={!input.trim() || isLoading || apiKeyStatus !== 'valid'}
                      sx={{
                        background: input.trim() && !isLoading && apiKeyStatus === 'valid'
                          ? 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
                          : 'transparent',
                        color: input.trim() && !isLoading && apiKeyStatus === 'valid' ? 'white' : 'text.secondary',
                        '&:hover': {
                          background: input.trim() && !isLoading && apiKeyStatus === 'valid'
                            ? 'linear-gradient(45deg, #1976d2 30%, #1e88e5 90%)'
                            : 'rgba(0, 0, 0, 0.04)',
                        }
                      }}
                    >
                      {isLoading ? (
                        <CircularProgress size={20} />
                      ) : (
                        <SendIcon fontSize="small" />
                      )}
                    </IconButton>
                  </span>
                </Tooltip>
              </InputAdornment>
            )
          }}
        />
      </Box>
    </Dialog>
  );
};

export default Chatbot;