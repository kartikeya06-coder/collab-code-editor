const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  roomId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  content: { 
    type: String, 
    default: '// Welcome to your collaborative workspace\n' 
  },
  language: { 
    type: String, 
    default: 'javascript' 
  },
  lastModified: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Document', documentSchema);