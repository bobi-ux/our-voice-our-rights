// server.js
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Mock data (replace later with live API or database)
const mgnregaData = {
  "Purba Bardhaman": { households: 12000, persondays: 45000, avgdays: 38 },
  "Paschim Medinipur": { households: 18000, persondays: 60000, avgdays: 33 },
  "Bankura": { households: 9500, persondays: 37000, avgdays: 39 },
  "Birbhum": { households: 14500, persondays: 52000, avgdays: 36 }
};

// Simple API route
app.get("/api/district/:name", (req, res) => {
  const districtName = req.params.name;
  const data = mgnregaData[districtName];
  if (data) {
    res.json({ district: districtName, ...data });
  } else {
    res.status(404).json({ error: "District not found" });
  }
});

// Default route
app.get("/", (req, res) => {
  res.send("MGNREGA Dashboard Backend is Running ✅");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
