// To start write: $ node main

const fs = require('fs');

fs.readFile('text.txt', 'utf8', (err, data) => {
	
	if (err) {
		console.log(err);
	}

	fs.writeFile('readMe.txt', data);
});


fs.readFile('readMe.txt', 'utf8', (err, data) => {
	
	if (err) {
		console.log(err);
	}

	console.log(data);
});

fs.unlink('text.txt');

console.log('The file contains...');