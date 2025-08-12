import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Grid, Card, CardContent, Paper, TableContainer, Table, TableHead,
    TableRow, TableCell, TableBody, Button, IconButton, Dialog, DialogTitle,
    DialogContent, DialogActions, TextField, LinearProgress
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// --- Mock Data for Dashboard Charts ---
const kpiData = {
    activeBuyers: 78,
    overallFillRate: 92.3,
    avgCsat: 4.8,
    totalSpend: 1250000
};
const spendOverTimeData = [
    { name: 'Jan', spend: 85000 }, { name: 'Feb', spend: 95000 }, { name: 'Mar', spend: 110000 },
    { name: 'Apr', spend: 105000 }, { name: 'May', spend: 130000 }, { name: 'Jun', spend: 155000 },
];
const topBuyersData = [
    { name: 'Global Retail Inc.', spend: 45000 }, { name: 'TechDeploy Solutions', spend: 32000 }, { name: 'National Telecom', spend: 28000 },
    { name: 'Innovate Logistics', spend: 19000 }, { name: 'Quantum Systems', spend: 15000 },
];

const Goals = () => {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('add');
    const [currentGoal, setCurrentGoal] = useState(null);

    const API_URL = 'http://localhost:5000/api/goals';

    const fetchGoals = async () => {
        setLoading(true);
        try {
            const response = await fetch(API_URL);
            setGoals(await response.json());
        } catch (error) {
            console.error("Failed to fetch goals:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        document.title = 'Goals & KPIs | Project Tracker';
        fetchGoals();
    }, []);

    const handleOpenModal = (type, goal = null) => {
        setModalType(type);
        setCurrentGoal(goal || { description: '', metric: '', target_value: 100, current_value: 0, due_date: '' });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => setIsModalOpen(false);

    const handleSave = async () => {
        const method = modalType === 'add' ? 'POST' : 'PUT';
        const url = modalType === 'add' ? API_URL : `${API_URL}/${currentGoal.goal_id}`;
        try {
            await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentGoal),
            });
            fetchGoals();
            handleCloseModal();
        } catch (error) {
            console.error(`Failed to ${modalType} goal:`, error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this goal?')) {
            try {
                await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
                fetchGoals();
            } catch (error) {
                console.error("Failed to delete goal:", error);
            }
        }
    };

    if (loading) return <Typography>Loading dashboard...</Typography>;

    return (
        <Box>
            <Typography variant="h1" gutterBottom>Goals & KPIs Dashboard</Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}><Card><CardContent><Typography color="text.secondary" gutterBottom>Active Buyers</Typography><Typography variant="h4">{kpiData.activeBuyers}</Typography></CardContent></Card></Grid>
                <Grid item xs={12} sm={6} md={3}><Card><CardContent><Typography color="text.secondary" gutterBottom>Overall Fill Rate</Typography><Typography variant="h4">{kpiData.overallFillRate}%</Typography></CardContent></Card></Grid>
                <Grid item xs={12} sm={6} md={3}><Card><CardContent><Typography color="text.secondary" gutterBottom>Average CSAT</Typography><Typography variant="h4">{kpiData.avgCsat} / 5.0</Typography></CardContent></Card></Grid>
                <Grid item xs={12} sm={6} md={3}><Card><CardContent><Typography color="text.secondary" gutterBottom>Total Spend (YTD)</Typography><Typography variant="h4">${kpiData.totalSpend.toLocaleString()}</Typography></CardContent></Card></Grid>
            </Grid>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} lg={6}><Card sx={{ p: 2 }}><Typography variant="h6" align="center">Buyer Spend Over Time</Typography><ResponsiveContainer width="100%" height={300}><LineChart data={spendOverTimeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Legend /><Line type="monotone" dataKey="spend" stroke="#8884d8" activeDot={{ r: 8 }} /></LineChart></ResponsiveContainer></Card></Grid>
                <Grid item xs={12} lg={6}><Card sx={{ p: 2 }}><Typography variant="h6" align="center">Top 5 Buyers by Spend</Typography><ResponsiveContainer width="100%" height={300}><BarChart data={topBuyersData} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}><CartesianGrid strokeDasharray="3 3" /><XAxis type="number" /><YAxis type="category" dataKey="name" width={120} /><Tooltip /><Legend /><Bar dataKey="spend" fill="#82ca9d" /></BarChart></ResponsiveContainer></Card></Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h2">SMART Goals</Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenModal('add')}>Add Goal</Button>
            </Box>
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead><TableRow><TableCell>Goal Description</TableCell><TableCell>Metric</TableCell><TableCell>Progress</TableCell><TableCell>Due Date</TableCell><TableCell align="right">Actions</TableCell></TableRow></TableHead>
                        <TableBody>
                            {goals.map((goal) => {
                                const progress = goal.target_value > 0 ? Math.min(100, Math.round((goal.current_value / goal.target_value) * 100)) : 0;
                                return (
                                    <TableRow key={goal.goal_id} hover>
                                        <TableCell>{goal.description}</TableCell>
                                        <TableCell>{goal.metric}</TableCell>
                                        <TableCell><Box sx={{ display: 'flex', alignItems: 'center' }}><Box sx={{ width: '100%', mr: 1 }}><LinearProgress variant="determinate" value={progress} /></Box><Box sx={{ minWidth: 35 }}><Typography variant="body2" color="text.secondary">{`${progress}%`}</Typography></Box></Box></TableCell>
                                        <TableCell>{goal.due_date ? new Date(goal.due_date).toLocaleDateString() : 'N/A'}</TableCell>
                                        <TableCell align="right"><IconButton size="small" onClick={() => handleOpenModal('edit', goal)}><EditIcon /></IconButton><IconButton size="small" onClick={() => handleDelete(goal.goal_id)}><DeleteIcon /></IconButton></TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            <Dialog open={isModalOpen} onClose={handleCloseModal}>
                <DialogTitle>{modalType === 'add' ? 'Add New Goal' : 'Edit Goal'}</DialogTitle>
                <DialogContent>
                    {currentGoal && (
                        <Box component="form" sx={{ pt: 1, width: '500px' }}>
                            <TextField autoFocus margin="dense" label="Description" fullWidth variant="outlined" value={currentGoal.description} onChange={(e) => setCurrentGoal({ ...currentGoal, description: e.target.value })} />
                            <TextField margin="dense" label="Metric" fullWidth variant="outlined" value={currentGoal.metric} onChange={(e) => setCurrentGoal({ ...currentGoal, metric: e.target.value })} />
                            <TextField margin="dense" label="Current Value" type="number" fullWidth variant="outlined" value={currentGoal.current_value} onChange={(e) => setCurrentGoal({ ...currentGoal, current_value: e.target.value })} />
                            <TextField margin="dense" label="Target Value" type="number" fullWidth variant="outlined" value={currentGoal.target_value} onChange={(e) => setCurrentGoal({ ...currentGoal, target_value: e.target.value })} />
                            <TextField type="date" margin="dense" label="Due Date" fullWidth InputLabelProps={{ shrink: true }} value={currentGoal.due_date ? new Date(currentGoal.due_date).toISOString().split('T')[0] : ''} onChange={(e) => setCurrentGoal({ ...currentGoal, due_date: e.target.value })} />
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal}>Cancel</Button>
                    <Button onClick={handleSave} variant="contained">Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Goals;