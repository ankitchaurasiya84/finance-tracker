

import React, { useState } from 'react';
import { User, Palette, Database, TrendingUp, Trash2, UserCircle, ChevronRight } from 'lucide-react';

const Profile = ({ 
  transactions = [], 
  budgets = [], 
  setBudgets, 
  setTransactions, 
  profile = { theme: 'light' }, 
  setProfile, 
  showSnackbar 
}) => {
  const [resetDialog, setResetDialog] = useState(false);
  const isDark = profile.theme === 'dark';

  const handleThemeChange = (event) => {
    const newTheme = event.target.checked ? 'dark' : 'light';
    setProfile({...profile, theme: newTheme});
    showSnackbar && showSnackbar(`Switched to ${newTheme} theme`);
  };

  const handleResetData = () => {
    setTransactions && setTransactions([]);
    setBudgets && setBudgets([]);
    setResetDialog(false);
    showSnackbar && showSnackbar('All data has been reset successfully');
  };

  const containerStyle = {
    maxWidth: '768px',
    margin: '0 auto',
    padding: '24px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    backgroundColor: isDark ? '#111827' : '#f9fafb',
    minHeight: '100vh'
  };

  const headerStyle = {
    background: isDark 
      ? 'linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)'
      : 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    borderRadius: '16px',
    padding: '24px',
    color: 'white',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    marginBottom: '24px'
  };

  const cardStyle = {
    backgroundColor: isDark ? '#1f2937' : 'white',
    borderRadius: '12px',
    boxShadow: isDark ? '0 4px 12px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.1)',
    border: isDark ? '1px solid #374151' : '1px solid #e5e7eb',
    marginBottom: '16px',
    overflow: 'hidden'
  };

  const listItemStyle = {
    padding: '20px 24px',
    borderBottom: isDark ? '1px solid #374151' : '1px solid #f3f4f6',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: isDark ? '#374151' : '#f9fafb'
    }
  };

  const lastListItemStyle = {
    ...listItemStyle,
    borderBottom: 'none'
  };

  const buttonStyle = {
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    justifyContent: 'center'
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#3b82f6',
    color: 'white'
  };

  const dangerButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#ef4444',
    color: 'white'
  };

  const outlineButtonStyle = {
    ...buttonStyle,
    backgroundColor: 'transparent',
    border: isDark ? '1px solid #4b5563' : '1px solid #d1d5db',
    color: isDark ? '#e5e7eb' : '#374151'
  };

  const switchStyle = {
    position: 'relative',
    display: 'inline-block',
    width: '44px',
    height: '24px'
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
    backgroundColor: profile.theme === 'dark' ? '#3b82f6' : '#ccc',
    transition: '0.4s',
    borderRadius: '24px'
  };

  const sliderBeforeStyle = {
    position: 'absolute',
    content: '""',
    height: '18px',
    width: '18px',
    left: profile.theme === 'dark' ? '23px' : '3px',
    bottom: '3px',
    backgroundColor: 'white',
    transition: '0.4s',
    borderRadius: '50%'
  };

  return (
    <div style={containerStyle}>
      {/* User Info Header */}
      <div style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <User size={32} />
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
              Welcome, Guest User
            </h2>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '14px'
            }}>
              <UserCircle size={16} />
              <span>Signed in as Guest</span>
            </div>
          </div>
        </div>
      </div>

      <h1 style={{ 
        fontSize: '32px', 
        fontWeight: 'bold', 
        color: isDark ? '#f9fafb' : '#1f2937', 
        marginBottom: '24px' 
      }}>
        Profile Settings
      </h1>
      
      {/* Settings List */}
      <div style={cardStyle}>
        {/* Appearance Settings */}
        <div style={listItemStyle}>
          <div style={{
            width: '40px',
            height: '40px',
            backgroundColor: isDark ? '#374151' : '#f3f4f6',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Palette size={20} color="#3b82f6" />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ 
              fontSize: '16px', 
              fontWeight: '600', 
              color: isDark ? '#f9fafb' : '#1f2937', 
              margin: '0 0 4px 0' 
            }}>
              Dark Theme
            </h3>
            <p style={{ 
              fontSize: '14px', 
              color: isDark ? '#9ca3af' : '#6b7280', 
              margin: 0 
            }}>
              Switch between light and dark modes
            </p>
          </div>
          <label style={switchStyle}>
            <input
              type="checkbox"
              checked={profile.theme === 'dark'}
              onChange={handleThemeChange}
              style={switchInputStyle}
            />
            <span style={sliderStyle}>
              <span style={sliderBeforeStyle}></span>
            </span>
          </label>
        </div>

        {/* Statistics */}
        <div style={listItemStyle}>
          <div style={{
            width: '40px',
            height: '40px',
            backgroundColor: isDark ? '#374151' : '#f3f4f6',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <TrendingUp size={20} color="#10b981" />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ 
              fontSize: '16px', 
              fontWeight: '600', 
              color: isDark ? '#f9fafb' : '#1f2937', 
              margin: '0 0 4px 0' 
            }}>
              Your Statistics
            </h3>
            <p style={{ 
              fontSize: '14px', 
              color: isDark ? '#9ca3af' : '#6b7280', 
              margin: 0 
            }}>
              {transactions.length} transactions • {budgets.length} budgets
            </p>
          </div>
          <ChevronRight size={20} color={isDark ? '#6b7280' : '#9ca3af'} />
        </div>

        {/* Data Management */}
        <div 
          style={lastListItemStyle}
          onClick={() => setResetDialog(true)}
        >
          <div style={{
            width: '40px',
            height: '40px',
            backgroundColor: '#fef2f2',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Database size={20} color="#ef4444" />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ 
              fontSize: '16px', 
              fontWeight: '600', 
              color: '#ef4444', 
              margin: '0 0 4px 0' 
            }}>
              Reset All Data
            </h3>
            <p style={{ 
              fontSize: '14px', 
              color: isDark ? '#9ca3af' : '#6b7280', 
              margin: 0 
            }}>
              Clear all transactions and budgets
            </p>
          </div>
          <ChevronRight size={20} color={isDark ? '#6b7280' : '#9ca3af'} />
        </div>
      </div>

      {/* Reset Confirmation Dialog */}
      {resetDialog && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: isDark ? '#1f2937' : 'white',
            borderRadius: '12px',
            padding: '24px',
            maxWidth: '400px',
            width: '90%',
            maxHeight: '90vh',
            overflow: 'auto',
            border: isDark ? '1px solid #374151' : 'none'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Trash2 size={20} color="#ef4444" />
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '600', 
                margin: 0,
                color: isDark ? '#f9fafb' : '#1f2937'
              }}>
                Reset All Data
              </h3>
            </div>
            
            <div style={{ marginBottom: '24px' }}>
              <p style={{ 
                color: isDark ? '#e5e7eb' : '#374151', 
                marginBottom: '12px' 
              }}>
                Are you sure you want to reset all your financial data? This will permanently delete:
              </p>
              <ul style={{ 
                paddingLeft: '20px', 
                fontSize: '14px', 
                color: isDark ? '#9ca3af' : '#6b7280', 
                marginBottom: '12px' 
              }}>
                <li>All {transactions.length} transactions</li>
                <li>All {budgets.length} budgets</li>
                <li>All financial summaries and reports</li>
              </ul>
              <p style={{ color: '#dc2626', fontWeight: '600', fontSize: '14px' }}>
                This action cannot be undone!
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setResetDialog(false)}
                style={{ ...outlineButtonStyle, flex: 1 }}
              >
                Cancel
              </button>
              <button
                onClick={handleResetData}
                style={{ ...dangerButtonStyle, flex: 1 }}
              >
                <Trash2 size={16} />
                <span>Reset Data</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;