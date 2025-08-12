import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Button, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, IconButton, Chip, Dialog, DialogTitle,
    DialogContent, DialogActions, TextField, MenuItem
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Initiatives = () => {
    const [initiatives, setInitiatives] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('add');
    const [currentInitiative, setCurrentInitiative] = useState(null);

    const API_URL = 'http://localhost:5000/api/initiatives';

    const fetchInitiatives = async () => {
        setLoading(true);
        try {
            const response = await fetch(API_URL);
            setInitiatives(await response.json());
        } catch (error) {
            console.error("Failed to fetch initiatives:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        document.title = 'Initiatives | Project Tracker';
        fetchInitiatives();
    }, []);

    const handleOpenModal = (type, initiative = null) => {
        setModalType(type);
        setCurrentInitiative(initiative || { name: '', description: '', status: 'Planning', start_date: '', end_date: '' });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => setIsModalOpen(false);

    const handleSave = async () => {
        const method = modalType === 'add' ? 'POST' : 'PUT';
        const url = modalType === 'add' ? API_URL : `${API_URL}/${currentInitiative.initiative_id}`;
        try {
            await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentInitiative),
            });
            fetchInitiatives();
            handleCloseModal();
        } catch (error) {
            console.error(`Failed to ${modalType} initiative:`, error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this initiative?')) {
            try {
                await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
                fetchInitiatives();
            } catch (error) {
                console.error("Failed to delete initiative:", error);
            }
        }
    };

    const getStatusChipColor = (status) => {
        switch (status) {
            case 'Active': return 'primary';
            case 'Completed': return 'success';
            case 'Blocked': return 'error';
            case 'Planning':
            default: return 'default';
        }
    };

    if (loading) return <Typography>Loading initiatives...</Typography>;

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h1">Initiatives</Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenModal('add')}>
                    Add Initiative
                </Button>
            </Box>
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Start Date</TableCell>
                                <TableCell>End Date</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {initiatives.map((init) => (
                                <TableRow key={init.initiative_id} hover>
                                    <TableCell>{init.name}</TableCell>
                                    <TableCell>{init.description}</TableCell>
                                    <TableCell>
                                        <Chip label={init.status} color={getStatusChipColor(init.status)} size="small" />
                                    </TableCell>
                                    <TableCell>{init.start_date ? new Date(init.start_date).toLocaleDateString() : 'N/A'}</TableCell>
                                    <TableCell>{init.end_date ? new Date(init.end_date).toLocaleDateString() : 'N/A'}</TableCell>
                                    <TableCell align="right">
                                        <IconButton size="small" onClick={() => handleOpenModal('edit', init)}><EditIcon /></IconButton>
                                        <IconButton size="small" onClick={() => handleDelete(init.initiative_id)}><DeleteIcon /></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/* Add/Edit Modal */}
            <Dialog open={isModalOpen} onClose={handleCloseModal}>
                <DialogTitle>{modalType === 'add' ? 'Add New Initiative' : 'Edit Initiative'}</DialogTitle>
                <DialogContent>
                    {currentInitiative && (
                        <Box component="form" sx={{ pt: 1 }}>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Name"
                                fullWidth
                                variant="outlined"
                                value={currentInitiative.name}
                                onChange={(e) => setCurrentInitiative({ ...currentInitiative, name: e.target.value })}
                            />
                            <TextField
                                margin="dense"
                                label="Description"
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                                value={currentInitiative.description}
                                onChange={(e) => setCurrentInitiative({ ...currentInitiative, description: e.target.value })}
                            />
                            <TextField
                                select
                                margin="dense"
                                label="Status"
                                fullWidth
                                value={currentInitiative.status}
                                onChange={(e) => setCurrentInitiative({ ...currentInitiative, status: e.target.value })}
                            >
                                {['Planning', 'Active', 'Completed', 'Blocked'].map((option) => (
                                    <MenuItem key={option} value={option}>{option}</MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                type="date"
                                margin="dense"
                                label="Start Date"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                value={currentInitiative.start_date ? new Date(currentInitiative.start_date).toISOString().split('T')[0] : ''}
                                onChange={(e) => setCurrentInitiative({ ...currentInitiative, start_date: e.target.value })}
                            />
                            <TextField
                                type="date"
                                margin="dense"
                                label="End Date"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                value={currentInitiative.end_date ? new Date(currentInitiative.end_date).toISOString().split('T')[0] : ''}
                                onChange={(e) => setCurrentInitiative({ ...currentInitiative, end_date: e.target.value })}
                            />
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

export default Initiatives;
