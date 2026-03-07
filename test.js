const https = require('https');

const data = JSON.stringify({
    username: "moali.xz.00a@gmail.com",
    password: "P@ssw0rd"
});

const options = {
    hostname: 'nabd.runasp.net',
    port: 443,
    path: '/api/Account/login',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = https.request(options, res => {
    let body = '';
    res.on('data', d => {
        body += d;
    });
    res.on('end', () => {
        console.log(`Status Code: ${res.statusCode}`);
        console.log(`Body: ${body}`);
    });
});

req.on('error', error => {
    console.error(error);
});

req.write(data);
req.end();
