import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import theme from './theme';

// Import Components
import Navbar from './components/Navbar';
import Login from './components/Login';
import Initiatives from './components/Initiatives';
import Partners from './components/Partners';
import Goals from './components/Goals';
import Search from './components/Search';
import ProtectedRoute from './components/ProtectedRoute';

// This layout component includes the Navbar for all protected pages
const AppLayout = ({ children }) => (
  <Box sx={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
    <Navbar />
    <Box component="main" sx={{ flexGrow: 1, p: 3, overflowY: 'auto' }}>
      {children}
    </Box>
  </Box>
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Normalizes styles across browsers */}
      <Router>
        <Routes>
          {/* Public Route: Login Page */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Routes>
                    <Route path="/initiatives" element={<Initiatives />} />
                    <Route path="/partners" element={<Partners />} />
                    <Route path="/goals" element={<Goals />} />
                    <Route path="/search" element={<Search />} />
                    {/* Default route after login */}
                    <Route path="/" element={<Initiatives />} />
                  </Routes>
                </AppLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
