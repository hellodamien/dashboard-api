import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Redoc from 'redoc-express';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const SECRET_KEY = 'your-secret-key'; // Change this in production

const app = express();
app.use(express.json());

const __dirname = path.resolve();
const openApiPath = path.join(__dirname, 'openapi.json');

app.get('/openapi.json', (req, res) => {
  fs.readFile(openApiPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to load OpenAPI spec' });
    }
    res.json(JSON.parse(data));
  });
});

app.get('/docs', Redoc({
  title: 'Express API with Prisma and JWT',
  specUrl: './openapi.json'
}));

app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashedPassword },
  });
  const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

app.get('/dashboard', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const { userId } = jwt.verify(token, SECRET_KEY);
    const user = await prisma.user.findUnique({ where: { id: userId } });
    res.json({ email: user.email });
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));

