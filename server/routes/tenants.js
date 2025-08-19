
import express from 'express';
import Tenant from '../models/Tenant.js';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), 'public/uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage, limits: { fileSize: 1024 * 1024 } }); // 1MB

const router = express.Router();

// Add tenant with photo upload
router.post('/', upload.single('photo'), async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided'});
  const token = authHeader.split(' ')[1];
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    const tenantData = req.body;
    if (req.file) {
      tenantData.photo = `/uploads/${req.file.filename}`;
    }
    const tenant = await Tenant.create(tenantData);
    res.status(201).json({ tenant });
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

router.get('/', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });
  const token = authHeader.split(' ')[1];
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    const tenants = await Tenant.find();
    res.json({ tenants });
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

router.get('/:id', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });
  const token = authHeader.split(' ')[1];
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    const tenant = await Tenant.findById(req.params.id);
    if (!tenant) return res.status(404).json({ message: 'Tenant not found' });
    res.json({ tenant });
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Update tenant with photo upload
router.put('/:id', upload.single('photo'), async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });
  const token = authHeader.split(' ')[1];
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    const updateData = req.body;
    if (req.file) {
      updateData.photo = `/uploads/${req.file.filename}`;
    }
    const updatedTenant = await Tenant.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!updatedTenant) return res.status(404).json({ message: 'Tenant not found' });
    res.json({ tenant: updatedTenant });
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Delete tenant
router.delete('/:id', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });
  const token = authHeader.split(' ')[1];
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    const deletedTenant = await Tenant.findByIdAndDelete(req.params.id);
    if (!deletedTenant) return res.status(404).json({ message: 'Tenant not found' });
    res.json({ message: 'Tenant deleted successfully' });
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

export default router;