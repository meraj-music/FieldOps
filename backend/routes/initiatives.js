const express = require('express');
const db = require('../db');
const router = express.Router();
// You would add middleware here later to protect routes

// GET all initiatives
router.get('/', async (req, res) => {
    try {
        const initiatives = await db.query("SELECT * FROM initiatives ORDER BY initiative_id ASC");
        res.json(initiatives.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// POST a new initiative (CREATE)
router.post('/', async (req, res) => {
    const { name, description, status, start_date, end_date } = req.body;
    try {
        const newInitiative = await db.query(
            "INSERT INTO initiatives (name, description, status, start_date, end_date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [name, description, status, start_date, end_date]
        );
        res.status(201).json(newInitiative.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// PUT/update an initiative (UPDATE)
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, status, start_date, end_date } = req.body;
        
        const updateInitiative = await db.query(
            "UPDATE initiatives SET name = $1, description = $2, status = $3, start_date = $4, end_date = $5 WHERE initiative_id = $6 RETURNING *",
            [name, description, status, start_date, end_date, id]
        );

        if (updateInitiative.rows.length === 0) {
            return res.status(404).json({ msg: "Initiative not found" });
        }

        res.json(updateInitiative.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// DELETE an initiative (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db.query("DELETE FROM initiatives WHERE initiative_id = $1", [id]);
        res.json({ msg: "Initiative deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;