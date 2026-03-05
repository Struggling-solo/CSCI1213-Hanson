const express = require('express');
const path = require('path');
const taskStore = require('./data/taskStore');
const expressLayouts = require('express-ejs-layouts');
const PORT = 3000;
const DATA_FILE = 'tasks.json';

const app = express();

console.log("RUNNING THIS FILE FROM:", __filename);
console.log("WORKING DIRECTORY:", process.cwd());
// logger
app.use((req, res, next) => {
  console.log(`Got a request: ${req.method} ${req.path}`);
  next();
});

// form parsing
app.use(express.urlencoded({ extended: false }));

// static files (public/styles.css etc.)
app.use(express.static(path.join(__dirname, 'public')));

// ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');

// HOME — show all tasks
app.get('/', (req, res) => {
  res.render('index', { title: 'Home'});
});

app.get('/tasks', (req, res) => {
  const tasks = taskStore.load();
  res.render('sampleEJS', { title: 'All Tasks', tasks });
});

// SHOW CREATE FORM
app.get('/create', (req, res) => {
  res.render('createTask', {title: "Create a Task"});
});

function saveTask(task) {
  let tasks = [];

  if (fs.existsSync(DATA_FILE)) {
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    tasks = JSON.parse(data);
  }

  // Determine next ID
  let nextId = 1;

  if (tasks.length > 0) {
    const maxId = Math.max(...tasks.map(t => t.id || 0));
    nextId = maxId + 1;
  }

  // assign ID
  task.id = nextId;

  tasks.push(task);

  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}

// SHOW DELETE PAGE
app.get('/delete', (req, res) => {
  const tasks = taskStore.load();
  res.render('deleteTask', { title: 'Delete Task', tasks });
});

// DELETE ACTION
app.post('/tasks/:id/delete', (req, res) => {
  const idToDelete = Number(req.params.id);

  // Load tasks, filter out the deleted one
  const tasks = taskStore.load();
  const updated = tasks.filter(t => Number(t.id) !== idToDelete);

  // Save back (you need a way to save the full updated array)
  taskStore.saveAll(updated);

  res.redirect('/tasks');
});

// PROCESS FORM
app.post('/task/process', (req, res) => {
  console.log(req.body);
  taskStore.saveTask(req.body);
  res.redirect('/');
});

// 404 must be last
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