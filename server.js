const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;  // Change this to whatever port you want

// Path to store the view count
const viewsFilePath = path.join(__dirname, 'views.json');

// Helper function to read and update views
const updateViews = () => {
  if (!fs.existsSync(viewsFilePath)) {
    fs.writeFileSync(viewsFilePath, JSON.stringify({ count: 0 }));
  }

  const data = JSON.parse(fs.readFileSync(viewsFilePath, 'utf-8'));
  data.count += 1;
  fs.writeFileSync(viewsFilePath, JSON.stringify(data));

  return data.count;
};

// Endpoint to handle views increment
app.get('/api/views', (req, res) => {
  const views = updateViews();
  res.json({ views });
});

// Start the server
app.listen(PORT, () => {
  console.log(`View counter API running on http://localhost:${PORT}`);
});
