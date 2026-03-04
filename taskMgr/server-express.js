const express = require('express');
const path = require('path');
const taskStore = require('./data/taskStore');
const fs = require('fs')
const PORT = 3000
const DATA_FILE = 'tasks.json'


function genAllTasksHTML(tasks) {

  let taskRows = "";

  if (tasks.length === 0) {
    taskRows = "<p>No tasks available.</p>";
  } else {
    tasks.forEach(task => {
      taskRows += `
        <div class="task-card">
            <p><strong>ID:</strong> ${task.id}</p>
            <p><strong>Title:</strong> ${task.title}</p>
            <p><strong>Description:</strong> ${task.description}</p>
            <p><strong>Due Date:</strong> 
              ${task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}
            </p>
        </div>
        <hr>
      `;
    });
  }

  return `
<!DOCTYPE html>
<html>
<head>
    <title>All Tasks</title>
    <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
    <h1>All Tasks</h1>
    
    ${taskRows}

    <br>
    <a href="/">
        <button type="button">Home</button>
    </a>

    <a href="/createTask.html">
        <button type="button">Add Task</button>
    </a>

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
app.set('view engine', 'ejs')
app.set('views', './views')

// GET / — index page
app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// GET /createTask.html

// // POST /task/process — form submission
// // req.body is already parsed — no manual chunk collecting needed
app.post('/task/process', (req, res) => {
console.log(req.body); // already a plain JS object

taskStore.saveTask(req.body);

const responseHTML = genResponseHTML(req.body);
res.send(responseHTML); // res.send() sets Content-Type automatically
});

// GET /tasks — view all tasks
app.get('/tasks', (req, res) => {
    const tasks = taskStore.load();

    const html = genAllTasksHTML(tasks);
    res.send(html);
});

app.get('/tasks/all/', (req,res) =>{
    const tasks = JSON.parse(fs.readFileSync('./tasks.json'))
    res.render('sampleEJS',{tasks})
})

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