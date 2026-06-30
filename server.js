/**
 * VILLAGE PORTAL - BACKEND SERVER (Node.js + Express + MySQL)
 * --------------------------------------------------------------
 * Run: npm install express mysql2 bcryptjs jsonwebtoken cors multer dotenv
 *      node server.js
 *
 * This is a STARTER skeleton wiring up the REST API the frontend (js/app.js,
 * js/auth.js) would call in production instead of localStorage.
 * Replace localStorage calls in the frontend with fetch() calls to these routes.
 */

const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'village_portal',
  waitForConnections: true,
  connectionLimit: 10,
});

// ===================== AUTH MIDDLEWARE =====================
function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}
function requireAdmin(req, res, next) {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admin only' });
  next();
}

// ===================== AUTH ROUTES =====================
app.post('/api/auth/register', async (req, res) => {
  const { name, email, phone, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  try {
    const [result] = await pool.query(
      'INSERT INTO users (name, email, phone, password_hash) VALUES (?,?,?,?)',
      [name, email, phone, hash]
    );
    res.json({ id: result.insertId, name, email });
  } catch (err) {
    res.status(400).json({ error: 'Email already registered' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const [rows] = await pool.query('SELECT * FROM users WHERE email=?', [email]);
  const user = rows[0];
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
});

// ===================== SCHEMES =====================
app.get('/api/schemes', async (req, res) => {
  const { category } = req.query;
  const [rows] = await pool.query(
    category ? 'SELECT * FROM schemes WHERE category=?' : 'SELECT * FROM schemes',
    category ? [category] : []
  );
  res.json(rows);
});
app.post('/api/schemes', authenticate, requireAdmin, async (req, res) => {
  const { name, name_te, category, eligibility, documents, benefits, last_date, apply_link } = req.body;
  const [result] = await pool.query(
    `INSERT INTO schemes (name,name_te,category,eligibility,documents,benefits,last_date,apply_link,created_by)
     VALUES (?,?,?,?,?,?,?,?,?)`,
    [name, name_te, category, eligibility, documents, benefits, last_date, apply_link, req.user.id]
  );
  res.json({ id: result.insertId });
});

// ===================== COMPLAINTS =====================
app.post('/api/complaints', authenticate, async (req, res) => {
  const { category, description, attachment_url } = req.body;
  const code = 'CMP-' + Date.now().toString().slice(-6);
  await pool.query(
    'INSERT INTO complaints (complaint_code,user_id,category,description,attachment_url) VALUES (?,?,?,?,?)',
    [code, req.user.id, category, description, attachment_url]
  );
  res.json({ complaint_code: code });
});
app.get('/api/complaints/:code', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM complaints WHERE complaint_code=?', [req.params.code]);
  res.json(rows[0] || { error: 'Not found' });
});
app.patch('/api/complaints/:code/resolve', authenticate, requireAdmin, async (req, res) => {
  await pool.query('UPDATE complaints SET status="resolved", resolved_at=NOW() WHERE complaint_code=?', [req.params.code]);
  res.json({ success: true });
});

// ===================== BUSINESS DIRECTORY =====================
app.get('/api/businesses', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM businesses WHERE approved=1');
  res.json(rows);
});
app.post('/api/businesses', authenticate, async (req, res) => {
  const { name, category, owner_name, phone, address, latitude, longitude } = req.body;
  const [result] = await pool.query(
    'INSERT INTO businesses (name,category,owner_name,phone,address,latitude,longitude) VALUES (?,?,?,?,?,?,?)',
    [name, category, owner_name, phone, address, latitude, longitude]
  );
  res.json({ id: result.insertId, status: 'pending_approval' });
});

// ===================== JOBS =====================
app.get('/api/jobs', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM jobs ORDER BY created_at DESC');
  res.json(rows);
});

// ===================== AI ASSISTANT =====================
// In production, forward `query` + village knowledge base context to an LLM API.
app.post('/api/assistant', authenticate, async (req, res) => {
  const { query, language } = req.body;
  const response = `Echo (${language}): ${query} — connect this endpoint to an LLM for real answers.`;
  await pool.query(
    'INSERT INTO assistant_logs (user_id, query, response, language) VALUES (?,?,?,?)',
    [req.user.id, query, response, language]
  );
  res.json({ response });
});

// ===================== ADMIN DASHBOARD STATS =====================
app.get('/api/admin/stats', authenticate, requireAdmin, async (req, res) => {
  const [[schemes]] = await pool.query('SELECT COUNT(*) c FROM schemes');
  const [[businesses]] = await pool.query('SELECT COUNT(*) c FROM businesses');
  const [[complaints]] = await pool.query('SELECT COUNT(*) c FROM complaints');
  const [[users]] = await pool.query('SELECT COUNT(*) c FROM users');
  res.json({ schemes: schemes.c, businesses: businesses.c, complaints: complaints.c, users: users.c });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Village Portal API running on port ${PORT}`));
