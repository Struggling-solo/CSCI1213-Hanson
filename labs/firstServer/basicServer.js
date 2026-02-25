const http = require('http');
const fs = require('fs')


const server = http.createServer((req,res) => {
    console.log(`${req.method} ${req.url}`)

    if (req.url === '/') {
        res.writeHead(200, {'content-type': 'text/html' });
        res.end(fs.readFileSync('index.html'));
    }
    else if (req.url === '/about') {
        res.writeHead(200, {'content-type': 'text/html' });
        res.end(fs.readFileSync('about.html'));
    }
    else {
        res.writeHead(200, {'content-type': 'text/html' }); 
        res.end(fs.readFileSync('notFound.html'));   }
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});
