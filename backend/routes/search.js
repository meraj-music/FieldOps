const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {
    const { q } = req.query; // e.g., /api/search?q=rollout

    if (!q || q.trim() === '') {
        return res.json([]); // Return empty array if query is empty
    }

    try {
        const searchQuery = `%${q}%`;

        // Search in initiatives (name and description)
        const initiativesPromise = db.query(
            "SELECT initiative_id, name, description, status, 'initiative' as type FROM initiatives WHERE name ILIKE $1 OR description ILIKE $1",
            [searchQuery]
        );

        // Search in partners (name)
        const partnersPromise = db.query(
            "SELECT partner_id, name, 'partner' as type FROM partners WHERE name ILIKE $1",
            [searchQuery]
        );

        // Search in goals (description and metric)
        const goalsPromise = db.query(
            "SELECT goal_id, description, metric, 'goal' as type FROM goals WHERE description ILIKE $1 OR metric ILIKE $1",
            [searchQuery]
        );

        // Wait for all searches to complete
        const [initiativesResult, partnersResult, goalsResult] = await Promise.all([
            initiativesPromise,
            partnersPromise,
            goalsPromise
        ]);

        // Combine all results into a single array
        const results = [
            ...initiativesResult.rows,
            ...partnersResult.rows,
            ...goalsResult.rows
        ];

        res.json(results);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;