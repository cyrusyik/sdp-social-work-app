const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../db')
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/staffs/login', async (req, res) => {
  const { email, password } = req.body;

  const stmt = db.prepare('SELECT * FROM staff WHERE staff_id = ? AND is_active = 1');
  const staff = stmt.get(staff_id);

  if (!staff || !bcrypt.compareSync(password, staff.password_hash)) {
    return res.status(401).json({ error: 'Invalid email or password'});
  }

  const token = jwt.sign(
    { staff_id: staff.staff_id }, JWT_SECRET, { expiresIn: '24h' }
  );

  res.json({
    token,
    staff: {
      staff_id: staff.staff_id,
      chinese_name: staff.chinese_name,
      english_last_name: staff.english_last_name,
      english_first_name: staff.english_first_name,
      english_middle_name: staff.english_middle_name,
    }
  });
});

module.exports = router;