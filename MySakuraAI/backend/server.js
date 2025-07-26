const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend')));

const memoryPath = path.join(__dirname, 'memory.json');
let memory = fs.existsSync(memoryPath) ? JSON.parse(fs.readFileSync(memoryPath)) : {};
let pendingTeach = {};

app.post('/api/chat', (req, res) => {
  const userMsg = req.body.message.trim().toLowerCase();
  const userId = req.body.userId || 'default';

  if (pendingTeach[userId]) {
    const question = pendingTeach[userId];
    memory[question] = userMsg;
    delete pendingTeach[userId];
    fs.writeFileSync(memoryPath, JSON.stringify(memory, null, 2));
    return res.json({ reply: `Got it! I’ll remember that.` });
  }

  if (memory[userMsg]) {
    return res.json({ reply: memory[userMsg] });
  } else {
    pendingTeach[userId] = userMsg;
    return res.json({ reply: `I don't know the answer to that. Can you tell me?` });
  }
});

app.listen(port, () => {
  console.log(`MySakura AI running at http://localhost:${port}`);
});
