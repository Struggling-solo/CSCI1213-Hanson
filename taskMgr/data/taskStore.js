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

function save(data) {
    try {
        let dataArr=[]
        dataArr.push(JSON.stringify(data, null, 2))
        fs.writeFileSync(DATA_FILE,JSON.stringify(dataArr, null, 2))
        return true;
    } catch (err) {
        console.log(`Error saving data ${err.message}`);
        return false;
    }
}

module.exports = {load, save}