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

// Save result - each result as separate file
app.post('/save-result', (req, res) => {
  try {
    const data = req.body;
    const resultsDir = path.join(__dirname, 'results');
    
    // Create results directory if not exists
    if (!fs.existsSync(resultsDir)) {
      fs.mkdirSync(resultsDir, { recursive: true });
    }
    
    // Save with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filePath = path.join(resultsDir, `result-${timestamp}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log('✅ Result saved:', filePath);
    res.json({ success: true, message: 'Nateeja save ho gaya!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

// View all results
app.get('/all-results', (req, res) => {
  const resultsDir = path.join(__dirname, 'results');
  if (!fs.existsSync(resultsDir)) {
    return res.json([]);
  }
  try {
    const files = fs.readdirSync(resultsDir)
      .filter(f => f.endsWith('.json'))
      .sort()
      .reverse(); // Latest first
    
    const allResults = files.map(file => {
      const data = fs.readFileSync(path.join(resultsDir, file), 'utf8');
      return JSON.parse(data);
    });
    
    res.json(allResults);
  } catch (err) {
    console.error(err);
    res.json([]);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`💌 Server chal raha hai: http://localhost:${PORT}`);
});
