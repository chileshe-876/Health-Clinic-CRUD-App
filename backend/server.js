const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('../frontend'));

// Routes
// GET all clinics
app.get('/api/clinic', (req, res) => {
    const sql = 'SELECT * FROM clinic ORDER BY created_at DESC';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching clinics:', err);
            return res.status(500).json({ error: 'Failed to fetch clinics' });
        }
        res.json(results);
    });
});

// GET single clinic
app.get('/api/clinic/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM clinic WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error fetching clinic:', err);
            return res.status(500).json({ error: 'Failed to fetch clinic' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Clinic not found' });
        }
        res.json(results[0]);
    });
});

// POST create new clinic
app.post('/api/clinic', (req, res) => {
    const { clinic_name, doctor_name, specialization, location, contact_number, hours_of_operation } = req.body;
    
    if (!clinic_name) {
        return res.status(400).json({ error: 'Clinic name is required' });
    }

    const sql = `INSERT INTO clinic (clinic_name, doctor_name, specialization, location, contact_number, hours_of_operation) 
                 VALUES (?, ?, ?, ?, ?, ?)`;
    
    db.query(sql, [clinic_name, doctor_name, specialization, location, contact_number, hours_of_operation], 
        (err, results) => {
            if (err) {
                console.error('Error creating clinic:', err);
                return res.status(500).json({ error: 'Failed to create clinic' });
            }
            res.status(201).json({ 
                id: results.insertId, 
                message: 'Clinic created successfully' 
            });
        });
});

// PUT update clinic
app.put('/api/clinic/:id', (req, res) => {
    const { id } = req.params;
    const { clinic_name, doctor_name, specialization, location, contact_number, hours_of_operation } = req.body;
    
    if (!clinic_name) {
        return res.status(400).json({ error: 'Clinic name is required' });
    }

    const sql = `UPDATE clinic SET clinic_name=?, doctor_name=?, specialization=?, location=?, 
                 contact_number=?, hours_of_operation=? WHERE id=?`;
    
    db.query(sql, [clinic_name, doctor_name, specialization, location, contact_number, hours_of_operation, id], 
        (err, results) => {
            if (err) {
                console.error('Error updating clinic:', err);
                return res.status(500).json({ error: 'Failed to update clinic' });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Clinic not found' });
            }
            res.json({ message: 'Clinic updated successfully' });
        });
});

// DELETE clinic
app.delete('/api/clinic/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM clinic WHERE id = ?';
    
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error deleting clinic:', err);
            return res.status(500).json({ error: 'Failed to delete clinic' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Clinic not found' });
        }
        res.json({ message: 'Clinic deleted successfully' });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});