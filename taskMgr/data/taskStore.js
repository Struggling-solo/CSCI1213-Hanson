const fs = require("fs");
const path = require("path");

// Store tasks.json at project root (same level as server-express.js)
const DATA_FILE = path.join(__dirname, "..", "tasks.json");

function load() {
  try {
    if (!fs.existsSync(DATA_FILE)) return [];
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  } catch (err) {
    console.log(`Error loading data ${err.message}`);
    return [];
  }
}

function saveAll(tasksArray) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasksArray, null, 2), "utf-8");
  } catch (err) {
    console.log(`Error saving all tasks ${err.message}`);
  }
}

function saveTask(task) {
  try {
    const allTasks = load();

    // Determine next ID
    let nextId = 1;
    if (allTasks.length > 0) {
      const allIds = allTasks
        .map(t => Number(t.id))
        .filter(n => Number.isFinite(n));

      const maxId = allIds.length > 0 ? Math.max(...allIds) : 0;
      nextId = maxId + 1;
    }

    task.id = nextId;
    allTasks.push(task);

    saveAll(allTasks);
  } catch (err) {
    console.log(`Error on Save Task data ${err.message}`);
  }
}

module.exports = { load, saveTask, saveAll };