const fs = require('fs');
const path = require('path');

console.log('='.repeat(60));
console.log('SETTING UP LAB FILES');
console.log('='.repeat(60));
  
// Create public directory
console.log('\n1. Creating public directory...');
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
    console.log('Created: public/');
} else {
    console.log('Already exists: public/');
}

// Create css directory
console.log('\n2. Creating css directory...');
const cssDir = path.join(publicDir, 'css');
if (!fs.existsSync(cssDir)) {
    fs.mkdirSync(cssDir);
    console.log('Created: public/css/');
} else {
    console.log('Already exists: public/css/');
}

// Create student-form.html
console.log('\n3. Creating student-form.html...');
const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Information Form</title>
    <!-- External CSS - will be requested from the server -->
    <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
    <div class="form-container">
        <h1>Student Information Form</h1>
        
        <form action="/submit-student" method="POST">
            <div class="form-group">
                <label for="fullname">Full Name <span class="required">*</span></label>
                <input type="text" id="fullname" name="fullname" required>
            </div>
            
            <div class="form-group">
                <label for="email">Email Address <span class="required">*</span></label>
                <input type="email" id="email" name="email" required>
            </div>
            
            <div class="form-group">
                <label for="studentid">Student ID <span class="required">*</span></label>
                <input type="text" id="studentid" name="studentid" required>
            </div>
            
            <div class="form-group">
                <label for="major">Major <span class="required">*</span></label>
                <select id="major" name="major" required>
                    <option value="">-- Select Major --</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="Web Development">Web Development</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="year">Expected Graduation Year <span class="required">*</span></label>
                <select id="year" name="year" required>
                    <option value="">-- Select Year --</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                </select>
            </div>
            
            <div class="form-group">
                <label>Programming Languages (check all that apply):</label>
                <div class="checkbox-group">
                    <label><input type="checkbox" name="languages" value="Python"> Python</label>
                    <label><input type="checkbox" name="languages" value="JavaScript"> JavaScript</label>
                    <label><input type="checkbox" name="languages" value="Java"> Java</label>
                    <label><input type="checkbox" name="languages" value="C++"> C++</label>
                    <label><input type="checkbox" name="languages" value="C#"> C#</label>
                </div>
            </div>
            
            <div class="form-group">
                <label for="comments">Additional Comments:</label>
                <textarea id="comments" name="comments" 
                          placeholder="Tell us about your goals and interests..."></textarea>
            </div>
            
            <button type="submit">Submit Information</button>
        </form>
    </div>
</body>
</html>`;

fs.writeFileSync(path.join(publicDir, 'student-form.html'), htmlContent);
console.log('   ✓ Created: public/student-form.html');

// Create styles.css
console.log('\n4. Creating styles.css...');
const stylesContent = `/* styles.css - Form Page Styles */

body {
    font-family: Arial, sans-serif;
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    background-color: #f5f5f5;
}

.form-container {
    background: white;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

h1 {
    color: #333;
    text-align: center;
    margin-bottom: 30px;
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 5px;
    color: #555;
    font-weight: bold;
}

input[type="text"],
input[type="email"],
select,
textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    box-sizing: border-box;
}

textarea {
    resize: vertical;
    min-height: 80px;
}

.checkbox-group {
    margin-top: 5px;
}

.checkbox-group label {
    display: inline-block;
    margin-right: 15px;
    font-weight: normal;
}

.checkbox-group input {
    margin-right: 5px;
}

button {
    width: 100%;
    padding: 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 10px;
}

button:hover {
    background-color: #0056b3;
}

.required {
    color: red;
}`;

fs.writeFileSync(path.join(cssDir, 'styles.css'), stylesContent);
console.log('   ✓ Created: public/css/styles.css');

// Create profile-styles.css
console.log('\n5. Creating profile-styles.css...');
const profileStylesContent = `/* profile-styles.css - Profile Page Styles */

body {
    font-family: Arial, sans-serif;
    max-width: 700px;
    margin: 50px auto;
    padding: 20px;
    background-color: #f5f5f5;
}

.profile-container {
    background: white;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

h1 {
    color: #007bff;
    border-bottom: 3px solid #007bff;
    padding-bottom: 10px;
    margin-bottom: 30px;
}

.profile-section {
    margin-bottom: 25px;
    padding: 15px;
    background-color: #f8f9fa;
    border-left: 4px solid #007bff;
    border-radius: 4px;
}

.profile-section h2 {
    color: #333;
    font-size: 18px;
    margin-top: 0;
    margin-bottom: 10px;
}

.field-label {
    font-weight: bold;
    color: #555;
    display: inline-block;
    width: 180px;
}

.field-value {
    color: #333;
}

.profile-row {
    margin: 10px 0;
    line-height: 1.6;
}

ul {
    margin: 5px 0;
    padding-left: 20px;
}

li {
    margin: 5px 0;
}

.comments-box {
    background: white;
    padding: 15px;
    border-radius: 4px;
    margin-top: 10px;
    border: 1px solid #ddd;
    font-style: italic;
    color: #666;
}

.back-link {
    display: inline-block;
    margin-top: 30px;
    padding: 10px 20px;
    background-color: #6c757d;
    color: white;
    text-decoration: none;
    border-radius: 4px;
}

.back-link:hover {
    background-color: #545b62;
}

.success-badge {
    display: inline-block;
    background-color: #28a745;
    color: white;
    padding: 5px 15px;
    border-radius: 20px;
    font-size: 14px;
    margin-bottom: 20px;
}`;

fs.writeFileSync(path.join(cssDir, 'profile-styles.css'), profileStylesContent);
console.log('   ✓ Created: public/css/profile-styles.css');

console.log('\n' + '='.repeat(70));
console.log('✓ SETUP COMPLETE!');
console.log('='.repeat(70));

console.log('\nYour directory structure now looks like:');
console.log('labs/');
console.log('├── server.js');
console.log('├── setup-files.js');
console.log('└── public/');
console.log('    ├── student-form.html');
console.log('    └── css/');
console.log('        ├── styles.css');
console.log('        └── profile-styles.css');

console.log('\n' + '='.repeat(70));
console.log('NEXT STEPS:');
console.log('='.repeat(70));
console.log('\n1. Start the server:');
console.log('   node server.js');
console.log('\n2. Open your browser to:');
console.log('   http://localhost:3000/');
console.log('   or');
console.log('   http://localhost:3000/labs');
console.log('\n3. You should see the student form with styling!');
console.log('\n' + '='.repeat(70));
