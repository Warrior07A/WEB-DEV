
import express from "express"
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cors from 'cors';

const prisma = new PrismaClient();
const app = express();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-demo';

app.use(cors());
app.use(express.json());

// Validation Schemas
const SignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string()
});

const SigninSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

const BookingSchema = z.object({
  carId: z.string().uuid(),
  startDate: z.string(),
  endDate: z.string(),
  totalPrice: z.number()
});

// Middleware
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.status(403).json({ error: 'Forbidden' });
    req.user = user;
    next();
  });
};

// Endpoints
app.post('/signup', async (req, res) => {
  try {
    const data = SignupSchema.parse(req.body);
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    const user = await prisma.user.create({
      data: { ...data, password: hashedPassword }
    });
    
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/signin', async (req, res) => {
  try {
    const data = SigninSchema.parse(req.body);
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    
    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/post', authenticateToken, async (req: any, res) => {
  try {
    const data = BookingSchema.parse(req.body);
    const booking = await prisma.booking.create({
      data: {
        ...data,
        userId: req.user.userId,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate)
      }
    });
    res.json(booking);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/delete/:id', authenticateToken, async (req: any, res) => {
  try {
    const { id } = req.params;
    await prisma.booking.delete({
      where: { id, userId: req.user.userId }
    });
    res.json({ message: 'Deleted successfully' });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
