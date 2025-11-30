
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authenticateToken, validateProductInput } = require('../services/service');
const prisma = new PrismaClient();

router.get('/list', authenticateToken, async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      select: { id: true, name: true, price: true }
    });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.get('/details', authenticateToken, async (req, res) => {
  try {
    const { id } = req.query;
    const product = await prisma.product.findUnique({ where: { id: Number(id) } });
    if (!product) return res.status(404).json({ message: 'Product not selected' });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.get('/search', authenticateToken, async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || typeof q !== 'string' || !q.trim()) {
      return res.json([]);
    }
    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: q,
          mode: 'insensitive',
        },
      },
    });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.post('/add', authenticateToken, async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    const validationError = validateProductInput({ name, price, quantity });
    if (validationError) {
      return res.status(400).json({ message: `Invalid input: ${validationError}` });
    }
    const product = await prisma.product.create({
      data: { name, price, quantity }
    });
    res.json(product);
  } catch (err) {
    if (err.code === 'P2002' && err.meta && err.meta.target && err.meta.target.includes('name')) {
      return res.status(400).json({ message: 'Product with this name already exists' });
    }
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.post('/update', authenticateToken, async (req, res) => {
  try {
    const { id, name, price, quantity } = req.body;
    const validationError = validateProductInput({ id, name, price, quantity, requireId: true });
    if (validationError) {
      return res.status(400).json({ message: `Invalid input: ${validationError}` });
    }
    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: { name, price, quantity }
    });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.post('/delete', authenticateToken, async (req, res) => {
  try {
    const { id } = req.body;
    await prisma.product.delete({ where: { id: Number(id) } });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
