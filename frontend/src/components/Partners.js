import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Button, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle,
    DialogContent, DialogActions, TextField
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Partners = () => {
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('add');
    const [currentPartner, setCurrentPartner] = useState(null);

    const API_URL = 'http://localhost:5000/api/partners';

    const fetchPartners = async () => {
        setLoading(true);
        try {
            const response = await fetch(API_URL);
            setPartners(await response.json());
        } catch (error) {
            console.error("Failed to fetch partners:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        document.title = 'Partners | Project Tracker';
        fetchPartners();
    }, []);

    const handleOpenModal = (type, partner = null) => {
        setModalType(type);
        setCurrentPartner(partner || { name: '', contact_person: '', email: '', phone: '' });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => setIsModalOpen(false);

    const handleSave = async () => {
        const method = modalType === 'add' ? 'POST' : 'PUT';
        const url = modalType === 'add' ? API_URL : `${API_URL}/${currentPartner.partner_id}`;
        try {
            await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentPartner),
            });
            fetchPartners();
            handleCloseModal();
        } catch (error) {
            console.error(`Failed to ${modalType} partner:`, error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this partner?')) {
            try {
                await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
                fetchPartners();
            } catch (error) {
                console.error("Failed to delete partner:", error);
            }
        }
    };

    if (loading) return <Typography>Loading partners...</Typography>;

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h1">Partners & Vendors</Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenModal('add')}>
                    Add Partner
                </Button>
            </Box>
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Partner Name</TableCell>
                                <TableCell>Main Contact</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {partners.map((partner) => (
                                <TableRow key={partner.partner_id} hover>
                                    <TableCell>{partner.name}</TableCell>
                                    <TableCell>{partner.contact_person}</TableCell>
                                    <TableCell>{partner.email}</TableCell>
                                    <TableCell>{partner.phone}</TableCell>
                                    <TableCell align="right">
                                        <IconButton size="small" onClick={() => handleOpenModal('edit', partner)}><EditIcon /></IconButton>
                                        <IconButton size="small" onClick={() => handleDelete(partner.partner_id)}><DeleteIcon /></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/* Add/Edit Modal */}
            <Dialog open={isModalOpen} onClose={handleCloseModal}>
                <DialogTitle>{modalType === 'add' ? 'Add New Partner' : 'Edit Partner'}</DialogTitle>
                <DialogContent>
                    {currentPartner && (
                        <Box component="form" sx={{ pt: 1 }}>
                            <TextField autoFocus margin="dense" label="Partner Name" fullWidth variant="outlined" value={currentPartner.name} onChange={(e) => setCurrentPartner({ ...currentPartner, name: e.target.value })} />
                            <TextField margin="dense" label="Main Contact" fullWidth variant="outlined" value={currentPartner.contact_person} onChange={(e) => setCurrentPartner({ ...currentPartner, contact_person: e.target.value })} />
                            <TextField margin="dense" label="Email" type="email" fullWidth variant="outlined" value={currentPartner.email} onChange={(e) => setCurrentPartner({ ...currentPartner, email: e.target.value })} />
                            <TextField margin="dense" label="Phone" type="tel" fullWidth variant="outlined" value={currentPartner.phone} onChange={(e) => setCurrentPartner({ ...currentPartner, phone: e.target.value })} />
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

export default Partners;
