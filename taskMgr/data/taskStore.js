const fs = require("fs");
const path = require("path");

const DATA_FILE = "tasks.json";

function load() {
    try {
        if (!fs.existsSync(DATA_FILE)) {
            return[];
        }
    return JSON.parse(fs.readFileSync(DATA_FILE,"utf-8"));
  } catch (err) {
    console.log(`Error loading data ${err.message}`);
    return [];
  }
}

function saveTask(task) {
  try {
    let allTasks = [];

    if (fs.existsSync(DATA_FILE)) {
      const existingTasks = fs.readFileSync(DATA_FILE, "utf-8");
      allTasks = JSON.parse(existingTasks);
    }

    // Determine next ID
    let nextId = 1;
    if (allTasks.length > 0) {
      const lastTask = allTasks[allTasks.length - 1];
      nextId = lastTask.id ? lastTask.id + 1 : allTasks.length + 1;
    }

    // Assign ID to task
    task.id = nextId;

    allTasks.push(task);

    fs.writeFileSync(DATA_FILE, JSON.stringify(allTasks, null, 2), "utf-8");

  } catch (err) {
    console.log(`Error on Save Task data ${err.message}`);
  }
}
 

module.exports = {load, saveTask}