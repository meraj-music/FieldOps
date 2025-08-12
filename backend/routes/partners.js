const express = require('express');
const db = require('../db');
const router = express.Router();

// GET all partners
router.get('/', async (req, res) => {
    try {
        const partners = await db.query("SELECT * FROM partners ORDER BY name ASC");
        res.json(partners.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// POST a new partner
router.post('/', async (req, res) => {
    const { name, contact_person, email, phone } = req.body;
    try {
        const newPartner = await db.query(
            "INSERT INTO partners (name, contact_person, email, phone) VALUES ($1, $2, $3, $4) RETURNING *",
            [name, contact_person, email, phone]
        );
        res.status(201).json(newPartner.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// PUT/update a partner
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, contact_person, email, phone } = req.body;
    try {
        const updatedPartner = await db.query(
            "UPDATE partners SET name = $1, contact_person = $2, email = $3, phone = $4 WHERE partner_id = $5 RETURNING *",
            [name, contact_person, email, phone, id]
        );
        if (updatedPartner.rows.length === 0) {
            return res.status(404).json({ msg: "Partner not found" });
        }
        res.json(updatedPartner.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// DELETE a partner
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM partners WHERE partner_id = $1", [id]);
        res.json({ msg: "Partner deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;