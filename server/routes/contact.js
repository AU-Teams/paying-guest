import express from 'express';
const router = express.Router();

router.post('/', async (req, res) => {
  // You can save to DB or send email here
  // For now, just return success
  res.status(200).json({ message: 'Message received' });
});

export default router;