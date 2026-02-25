const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");

const PORT = 3000;
const DATA_FILE = "tasks.json";

// MIME types for different file extensions
const mimeTypes = {
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".html": "text/html",
  ".ico": "image/x-icon",
};

//turn the form data string into an Object
function parseFormData(formDataString) {
  const params = new URLSearchParams(formDataString);
  const formData = {};

  for (const [key, value] of params.entries()) {
    formData[key] = value;
  }

  return formData;
}
function genResponseHTML(formDataString) {
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
                <span class="field-value">${formDataString.title}</span>
            </div>
            <div class="profile-row">
                <span class="field-label">Description:</span>
                <span class="field-value">${formDataString.description}</span>
            </div>
            <div class="profile-row">
                <span class="field-label">Due Date:</span>
                <span class="field-value">${new Date(formDataString.dueDate).toLocaleDateString()}</span>
            </div>
        </div>
        
       
</body>
</html>
    `;
}

function processTaskCreate(req, res) {
  console.log("→ Processing form submission");

  let body = "";

  // Collect data chunks
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  // Process complete data
  req.on("end", () => {
    const formData = parseFormData(body);

    console.log("Received form data:");
    console.log(formData);

    // Generate and send response
    const responseHTML = genResponseHTML(formData);
    res.writeHead(200, { "Content-Type": mimeTypes[".html"] });
    res.end(responseHTML);
  });
}
function serveStaticFile(requestedPath, res) {
  //Here is where we setup the "all static files loive in /public" rule
  const filePath = path.join(__dirname, "public", requestedPath);

  console.log(`serve static looks for ${filePath}`);

  // SECURITY: Ensure the requested file is within the public directory
  const publicDir = path.join(__dirname, "public");
  if (!filePath.startsWith(publicDir)) {
    res.writeHead(403, { "Content-Type": "text/plain" });
    res.end("Forbidden: Access denied");
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(`Error reading file ${filePath}:`, err.message);
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 - File Not Found");
      return;
    }

    // Determine the Content-Type based on file extension
    const ext = path.extname(filePath);
    const contentType = mimeTypes[ext] || "application/octet-stream";

    console.log(`Serving ${filePath} as ${contentType}`);

    // Send the file with appropriate headers
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  console.log(`Got a request ${pathname}`);
  console.log(`The dirname is ${__dirname}`);

  if (pathname === "/" && method === "GET") {
    serveStaticFile("/index.html", res);
  } else if (pathname === "/createTask.html" && method === "GET") {
    serveStaticFile("/createTask.html", res);
  } else if (pathname === "/task/process" && method === "POST") {
    processTaskCreate(req, res);
  } else if (pathname.endsWith(".css")) {
    serveStaticFile(pathname, res);
  }
});

server.listen(PORT, () => {
  console.log("=".repeat(50));
  console.log("Task Manager Server");
  console.log("=".repeat(50));
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`Data will be stored in: ${DATA_FILE}`);
  console.log("\nPress Ctrl+C to stop the server");
  console.log("=".repeat(50));
});