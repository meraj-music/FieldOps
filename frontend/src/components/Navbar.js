import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Box, Button, Typography } from '@mui/material';

// We no longer need useDarkMode, Brightness icons, or IconButton here
// as theme switching is handled by the browser/OS settings now.

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <AppBar position="static" color="default" elevation={1}>
            <Toolbar>
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    <img src="/logo.png" alt="App Logo" style={{ height: 40, marginRight: '1rem' }} />
                    <Typography variant="h6" component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
                        Project Tracker
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Button component={NavLink} to="/initiatives" color="inherit">Initiatives</Button>
                    <Button component={NavLink} to="/partners" color="inherit">Partners</Button>
                    <Button component={NavLink} to="/goals" color="inherit">Goals</Button>
                    <Button component={NavLink} to="/search" color="inherit">Search</Button>
                </Box>

                <Box sx={{ flexGrow: 1 }} />

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Button variant="outlined" color="primary" onClick={handleLogout}>
                        Logout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;