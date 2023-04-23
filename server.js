const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};


//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.post('/messages', (req, res) => {
  const { id, from, text } = req.body;
  const message = { id, from, text };
  messages.push(message);
  res.status(201).json(message);
});

app.get('/messages', (req, res) => {
  res.json(messages);
});

app.get('/messages/:id', (req, res) => {
  const messageId = parseInt(req.params.id);
  const message = messages.find(msg => msg.id === messageId);
  if (message) {
    res.json(message);
  } else {
    res.status(404).json({ error: 'Message not found' });
  }
});

app.delete('/messages/:id', (req, res) => {
  const messageId = parseInt(req.params.id);
  const index = messages.findIndex(msg => msg.id === messageId);
  if (index !== -1) {
    messages.splice(index, 1);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Message not found' });
  }
});

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.listen(process.env.PORT);
