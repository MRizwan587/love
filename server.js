const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Root route - serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// In-memory storage for results (works on Vercel)
let allResults = [];

// Save result to memory
app.post('/save-result', (req, res) => {
  try {
    const data = req.body;
    allResults.push(data);
    console.log('✅ Result saved. Total results:', allResults.length);
    res.json({ success: true, message: 'Nateeja save ho gaya!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

// View all results
app.get('/all-results', (req, res) => {
  res.json(allResults);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`💌 Server chal raha hai: http://localhost:${PORT}`);
});
