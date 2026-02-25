// Intentionally empty callback on the createServer call
// for use as a lab


const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const { resolve } = require('dns/promises');

const PORT = 3000;

// MIME types for different file extensions
const mimeTypes = {
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.html': 'text/html',
    '.ico': 'image/x-icon'
};

/**
 * Serve static files from the public directory
 * This function reads a file from disk and sends it to the client
 * with the appropriate Content-Type header
 */
function serveStaticFile(requestedPath, res) {
    // Construct the full file path
    const filePath = path.join(__dirname, 'public', requestedPath);
                            // 'public' makes sure all info comes from/ goes to public directory - security issue
    // SECURITY: Ensure the requested file is within the public directory
    const publicDir = path.join(__dirname, 'public');
    if (!filePath.startsWith(publicDir)) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('Forbidden: Access denied');
        return;
    }
    
    // Read the file from disk
    fs.readFile(filePath, (err, data) => {
        if (err) {
            // File doesn't exist or can't be read
            console.error(`Error reading file ${filePath}:`, err.message);
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 - File Not Found');
            return;
        }
        
        // Determine the Content-Type based on file extension
        const ext = path.extname(filePath);
        const contentType = mimeTypes[ext] || 'application/octet-stream';
        // above selects extension type from list created lines 15-23
        console.log(`Serving ${filePath} as ${contentType}`);
        
        // Send the file with appropriate headers
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
}

/**
 * Parse URL-encoded form data into a JavaScript object
 */
function parseFormData(formDataString) {
    const params = new URLSearchParams(formDataString);
    const formData = {};
    // params is an instance of url search params, .entries give checkbox items
    for (const [key, value] of params.entries()) {
        // Handle multiple values with the same key (checkboxes)
        if (formData[key]) {
            if (Array.isArray(formData[key])) {
                formData[key].push(value);
            } else {
                formData[key] = [formData[key], value];
            }
        } else {
            formData[key] = value;
        }
    }
    
    return formData;
}

/**
 * Generate HTML response for the student profile
 * Note: This response also uses an external CSS file!
 */
function generateResponseHTML(formData) {
    // Handle languages array or single value
    let languagesList = '';
    if (formData.languages) {
        const languages = Array.isArray(formData.languages) 
            ? formData.languages 
            : [formData.languages];
        languagesList = languages.map(lang => `<li>${lang}</li>`).join('');
    } else {
        languagesList = '<li><em>None selected</em></li>';
    }
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Profile</title>
    <!-- This CSS file will also be requested from the server! -->
    <link rel="stylesheet" href="/css/profile-styles.css">
</head>
<body>
    <div class="profile-container">
        <div class="success-badge">✓ Successfully Submitted</div>
        <h1>Student Profile</h1>
        
        <div class="profile-section">
            <h2>Personal Information</h2>
            <div class="profile-row">
                <span class="field-label">Full Name:</span>
                <span class="field-value">${formData.fullname}</span>
            </div>
            <div class="profile-row">
                <span class="field-label">Email Address:</span>
                <span class="field-value">${formData.email}</span>
            </div>
            <div class="profile-row">
                <span class="field-label">Student ID:</span>
                <span class="field-value">${formData.studentid}</span>
            </div>
        </div>
        
        <div class="profile-section">
            <h2>Academic Information</h2>
            <div class="profile-row">
                <span class="field-label">Major:</span>
                <span class="field-value">${formData.major}</span>
            </div>
            <div class="profile-row">
                <span class="field-label">Expected Graduation:</span>
                <span class="field-value">${formData.year}</span>
            </div>
        </div>
        
        <div class="profile-section">
            <h2>Programming Languages</h2>
            <ul>
                ${languagesList}
            </ul>
        </div>
        
        ${formData.comments ? `
        <div class="profile-section">
            <h2>Additional Comments</h2>
            <div class="comments-box">
                ${formData.comments}
            </div>
        </div>
        ` : ''}
        
        <a href="/" class="back-link">← Back to Form</a>
    </div>
</body>
</html>
    `;
}

// Create the HTTP server
const server = http.createServer((req, res) => {
    console.log(`Starter file for the server. We'll add code during lab`);
    const parsedUrl = url.parse(req.url, true)
    const pathname = parsedUrl.pathname

    // start routing

    if(pathname === '/' || pathname === '/student-form.html' || pathname === '/labs'){
        console.log('Serving student form')
        const filePath = path.join(__dirname,'public','student-form.html')
        serveStaticFile('/student-form.html', res)
    }
    else if (pathname.startsWith('/css/') ||
             pathname.startsWith('/js/') ||
             pathname.startsWith('/images/')) {
                console.log('Serving Static file')
                serveStaticFile(pathname, res)
             }
    else if (pathname === '/submit-student' && req.method === 'POST'){
        console.log('Processing the form')
        let body =''

        //collect the chunks, it may be huge (like customer complaint)
        req.on('data', (chunk) =>{
            body += chunk
        })
        req.on('end', () => {
         
            console.log('Recvd form data');
            console.log(`${req.body.fullname} ${req.body.email}`);

            //generate and send response

            res.writeHead(200,{'Content-Type' : 'text/html'} )
            res.end(responseHTML)
        });
    }
});

// Start the server
server.listen(PORT, () => {
    console.log('=====================================');
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log('=====================================');
    console.log('\nTo test:');
    console.log(`1. Visit http://localhost:${PORT}/ in your browser`);
    console.log('2. Open DevTools (F12) → Network tab');
    console.log('3. Refresh the page');
    console.log('4. You should see requests for:');
    console.log('   - / (the HTML)');
    console.log('   - /css/styles.css (the stylesheet)');
    console.log('\nBoth should return status 200!\n');
});