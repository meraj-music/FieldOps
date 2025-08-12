import React, { useState, useEffect } from 'react';
import { Container, Box, Card, Typography, TextField, Button, CircularProgress, Link } from '@mui/material';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.title = 'Login | Project Tracker';
    }, []);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (data.token) {
                localStorage.setItem('token', data.token);
                window.location.href = '/initiatives';
            } else {
                // You would add proper error handling here (e.g., a snackbar)
                alert('Login failed. Check credentials.');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred during login.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                bgcolor: 'background.default',
            }}
        >
            <Container component="main" maxWidth="xs">
                <Card sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src="/logo.png" alt="Logo" style={{ height: 60, marginBottom: '1rem' }} />
                    <Typography variant="h5" component="h1" gutterBottom>
                        Welcome Back
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 3 }}>
                        Sign in to continue
                    </Typography>
                    <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={formData.username}
                            onChange={onChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={onChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, py: 1.5 }}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
                        </Button>
                    </Box>
                </Card>
            </Container>
        </Box>
    );
};

export default Login;
