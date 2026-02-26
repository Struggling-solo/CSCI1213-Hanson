const express = require('express');
const path = require('path');
const taskStore = require('./data/taskStore');

const PORT = 3000
const DATA_FILE = 'tasks.json'

function genResponseHTML(formData) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Created</title>
    <!-- This CSS file will also be requested from the server! -->
    <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
    <div class="profile-container">
        <div class="success-badge">✓ Successfully Submitted</div>
        <h1>Task Created</h1>
        
        <div class="profile-section">
            <h2>Task Info</h2>
            <div class="profile-row">
                <span class="field-label">Task:</span>
                <span class="field-value">${formData.title}</span>
            </div>
            <div class="profile-row">
                <span class="field-label">Description:</span>
                <span class="field-value">${formData.description}</span>
            </div>
            <div class="profile-row">
                <span class="field-label">Due Date:</span>
                <span class="field-value">${new Date(formData.dueDate).toLocaleDateString()}</span>
            </div>
        </div>
        
       
</body>
</html>
    `;
}

// app now instance of express
const app = express();

// logger - runs on every request
app.use((req,res,next) => {
    console.log(`Got a request: ${req.method} ${req.path}`);
    next();
});

// Replaces parseFormData() AND the req.on('data') / req.on('end') pattern
app.use(express.urlencoded({ extended: false }));

// Replaces serveStaticFile(), mimeTypes, fs.readFile(), and security check
app.use(express.static(path.join(__dirname, 'public')));
// dirname is where server is running from

// GET / — index page
app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// GET /createTask.html

// // POST /task/process — form submission
// // req.body is already parsed — no manual chunk collecting needed
app.post('/task/process', (req, res) => {
console.log(req.body); // already a plain JS object

taskStore.save(JSON.stringify(req.body));

const responseHTML = genResponseHTML(req.body);
res.send(responseHTML); // res.send() sets Content-Type automatically
});

// 404 catch-all — must be LAST
app.use((req, res) => {
res.status(404).send('404 - Page Not Found');
});

app.listen(PORT, () => {
  console.log("=".repeat(50));
  console.log("Task Manager Server (Express)");
  console.log("=".repeat(50));
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`Data will be stored in: ${DATA_FILE}`);
  console.log("\nPress Ctrl+C to stop the server");
  console.log("=".repeat(50));
});