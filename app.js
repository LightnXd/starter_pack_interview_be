require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});


// Use auth router
const authRouter = require('./api/auth');
const productRouter = require('./api/product');
app.use('/api/auth', authRouter);
app.use('/api/product', productRouter);

// Echo for debugging
app.post('/echo', (req, res) => {
  console.log('Echo headers:', req.headers);
  console.log('Echo body:', req.body);
  res.json({ ok: true, body: req.body, headers: req.headers });
});

// Start server
app.listen(port, () => {
  console.log('Server is running on port', port);
});
