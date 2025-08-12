import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#f26722', // Field Nation Orange
    },
    secondary: {
      main: '#4a90e2', // A friendly blue for secondary actions
    },
    background: {
      default: '#f9f9f9', // A very light, warm off-white
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
        fontSize: '2.25rem',
        fontWeight: 700,
    },
    h2: {
        fontSize: '1.75rem',
        fontWeight: 600,
    }
  },
  components: {
    MuiCard: {
        styleOverrides: {
            root: {
                borderRadius: 12,
                boxShadow: '0 4px 12px rgba(149, 157, 165, 0.1)',
            }
        }
    }
  }
});

export default theme;