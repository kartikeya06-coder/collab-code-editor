const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const { setupWSConnection } = require('./node_modules/y-websocket/bin/utils.js');
const Document = require('./models/Document');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/code-platform')
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// 2. Express Routes
// Fetch or create a document when a user joins a room
app.get('/api/documents/:roomId', async (req, res) => {
  const { roomId } = req.params;
  try {
    let doc = await Document.findOne({ roomId });
    if (!doc) {
      try {
        // Attempt to create the document
        doc = await Document.create({ roomId });
      } catch (err) {
        // If it fails because another tab JUST created it, fetch it again
        if (err.code === 11000) {
          doc = await Document.findOne({ roomId });
        } else {
          throw err; // Real error
        }
      }
    }
    res.json(doc);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error fetching document' });
  }
});

// 3. Create the HTTP and WebSocket Server
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// 4. Handle Real-Time Connections
wss.on('connection', (ws, req) => {
  console.log('New WebSocket connection established');
  // y-websocket takes over this socket to sync the Y.js document
  setupWSConnection(ws, req);
});

const { executeJavaScript } = require('./services/dockerService');

// Code Execution Endpoint
app.post('/api/execute', async (req, res) => {
  const { code, language } = req.body;

  if (!code) {
    return res.status(400).json({ error: "No code provided" });
  }

  if (language === 'javascript') {
    const result = await executeJavaScript(code);
    return res.json(result);
  } else {
    // Later you can add python:alpine, cpp, etc.
    return res.status(400).json({ error: "Language not supported yet" });
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});