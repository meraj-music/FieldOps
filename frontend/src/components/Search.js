import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Grid, Card, CardContent, Chip, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    useEffect(() => {
        document.title = 'Search | Project Tracker';
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        setLoading(true);
        setHasSearched(true);
        try {
            const response = await fetch(`http://localhost:5000/api/search?q=${encodeURIComponent(query)}`);
            setResults(await response.json());
        } catch (error) {
            console.error("Search failed:", error);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    const getTypeChip = (item) => {
        switch (item.type) {
            case 'initiative': return <Chip label="Initiative" color="primary" size="small" />;
            case 'partner': return <Chip label="Partner" color="secondary" size="small" />;
            case 'goal': return <Chip label="Goal" color="success" size="small" />;
            default: return null;
        }
    };

    const renderResult = (item) => (
        <Grid item xs={12} md={6} lg={4} key={`${item.type}-${item.initiative_id || item.partner_id || item.goal_id}`}>
            <Card sx={{ height: '100%' }}>
                <CardContent>
                    {getTypeChip(item)}
                    <Typography variant="h6" component="div" sx={{ mt: 1, mb: 1.5 }}>
                        {item.name || item.description}
                    </Typography>
                    {item.type === 'initiative' && <Typography variant="body2" color="text.secondary">{item.description}</Typography>}
                    {item.type === 'goal' && <Typography variant="body2" color="text.secondary">Metric: {item.metric}</Typography>}
                </CardContent>
            </Card>
        </Grid>
    );

    return (
        <Box sx={{ maxWidth: 1200, margin: 'auto' }}>
            <Typography variant="h1" align="center">Universal Search</Typography>
            <Typography variant="h6" color="text.secondary" align="center" sx={{ mb: 4 }}>
                Find anything across your initiatives, partners, and goals.
            </Typography>

            <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', gap: 2, mb: 4 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="e.g., 'Rollout', 'TechDeploy', 'Fill Rate'..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Button type="submit" variant="contained" size="large" startIcon={<SearchIcon />} disabled={loading}>
                    {loading ? 'Searching...' : 'Search'}
                </Button>
            </Box>

            <Box>
                {loading && <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}><CircularProgress /></Box>}
                {!loading && hasSearched && results.length === 0 && (
                    <Typography align="center" color="text.secondary" sx={{ mt: 4 }}>
                        No results found for "{query}".
                    </Typography>
                )}
                {!loading && results.length > 0 && (
                    <Grid container spacing={3}>
                        {results.map(renderResult)}
                    </Grid>
                )}
            </Box>
        </Box>
    );
};

export default Search;
