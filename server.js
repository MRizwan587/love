const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static('.'));

// Save result
app.post('/save-result', (req, res) => {
  try {
    const data = req.body;
    const filePath = path.join(__dirname, 'rizwan-result.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log('✅ Result saved:', filePath);
    res.json({ success: true, message: 'Nateeja save ho gaya!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

// View saved result
app.get('/rizwan-result.json', (req, res) => {
  const filePath = path.join(__dirname, 'rizwan-result.json');
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ message: 'Abhi koi result save nahi hua.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`💌 Server chal raha hai: http://localhost:${PORT}`);
});
