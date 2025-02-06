import express from 'express';
import pool from '../../config/dbConfig.js';
// import bcrypt from 'bcryptjs'; // Şimdilik yorum satırı

const router = express.Router();

// Kayıt Endpoint
router.post('/', async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    // Validasyon
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Zorunlu alanları doldurun' });
    }

    // E-posta kontrolü
    const [existingUsers] = await pool.query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({ 
        success: false,
        message: 'Bu e-posta zaten kayıtlı'
      });
    }

    // Şimdilik hash kullanmadan direkt kayıt
    // const hashedPassword = await bcrypt.hash(password, 10);
    
    const [result] = await pool.query(
      `INSERT INTO users 
      (first_name, last_name, email, password) 
      VALUES (?, ?, ?, ?)`,
      [first_name, last_name, email, password /* hashedPassword yerine direkt password */]
    );

    res.status(201).json({
      success: true,
      message: 'Kullanıcı başarıyla kaydedildi',
      userId: result.insertId
    });

  } catch (error) {
    console.error('Kayıt hatası:', error);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası: ' + error.message
    });
  }
});

// Giriş Endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Kullanıcı sorgusu
    const [users] = await pool.query(
      'SELECT id, first_name, last_name, email, password, rank FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'Kullanıcı bulunamadı' 
      });
    }

    const user = users[0];
    
    // Şimdilik direkt string karşılaştırma
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    const isPasswordValid = (password === user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false,
        message: 'Geçersiz şifre' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Giriş başarılı',
      user: {
        id: user.id,
        name: `${user.first_name} ${user.last_name}`,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Giriş hatası:', error);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası: ' + error.message
    });
  }
});

export default router;