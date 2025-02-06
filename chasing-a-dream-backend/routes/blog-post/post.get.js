import express from 'express';
import pool from '../../config/dbConfig.js';

const router = express.Router();

// Tüm postları getiren API
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM posts ORDER BY id DESC');
        res.json({ success: true, data: rows });
    } catch (error) {
        console.error('Veri çekme hatası:', error);
        res.status(500).json({ success: false, message: 'Sunucu hatası' });
    }
});

// Kart için gerekli verileri çeken API
router.get('/card-get', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT id, baslik, img, created_at 
            FROM posts 
            ORDER BY id DESC
        `);
        res.json({ success: true, data: rows });
    } catch (error) {
        console.error('Veri çekme hatası:', error);
        res.status(500).json({ success: false, message: 'Sunucu hatası' });
    }
});

export default router;
