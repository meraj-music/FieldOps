const express = require('express');
const db = require('../db');
const router = express.Router();

// GET all goals
router.get('/', async (req, res) => {
    try {
        // We can join with initiatives later if needed
        const goals = await db.query("SELECT * FROM goals ORDER BY goal_id ASC");
        res.json(goals.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// POST a new goal
router.post('/', async (req, res) => {
    const { description, metric, target_value, current_value, due_date } = req.body;
    try {
        const newGoal = await db.query(
            "INSERT INTO goals (description, metric, target_value, current_value, due_date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [description, metric, target_value, current_value, due_date]
        );
        res.status(201).json(newGoal.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// PUT/update a goal
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { description, metric, target_value, current_value, due_date } = req.body;
    try {
        const updatedGoal = await db.query(
            "UPDATE goals SET description = $1, metric = $2, target_value = $3, current_value = $4, due_date = $5 WHERE goal_id = $6 RETURNING *",
            [description, metric, target_value, current_value, due_date, id]
        );
        if (updatedGoal.rows.length === 0) {
            return res.status(404).json({ msg: "Goal not found" });
        }
        res.json(updatedGoal.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// DELETE a goal
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM goals WHERE goal_id = $1", [id]);
        res.json({ msg: "Goal deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;