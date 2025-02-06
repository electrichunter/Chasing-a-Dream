import express from 'express';
import pool from '../../config/dbConfig.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { baslik, img, title, content } = req.body;

    // Validasyon
    if (!baslik || !img || !title || !content) {
      return res.status(400).json({ 
        success: false, 
        message: 'Zorunlu alanları doldurun' 
      });
    }

    // Başlık kontrolü (aynı başlıkta post var mı?)
    const [existingPost] = await pool.query(
      'SELECT id FROM posts WHERE baslik = ?',
      [baslik]
    );

    if (existingPost.length > 0) {
      return res.status(409).json({ 
        success: false,
        message: 'Bu başlık zaten kayıtlı' 
      });
    }

    // Yeni post ekleme
    const [result] = await pool.query(
      `INSERT INTO posts 
      (baslik, img, title, content) 
      VALUES (?, ?, ?, ?)`,
      [baslik, img, title, content]
    );

    res.status(201).json({
      success: true,
      message: 'Gönderi başarıyla kaydedildi',
      postId: result.insertId
    });
  } catch (error) {
    console.error('Kayıt hatası:', error);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası: ' + error.message
    });
  }
});

export default router;