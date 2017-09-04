const fs = require('fs');
const parse = require('xml-parser');
const inspect = require('util').inspect;
 

(() => {
    
    const xml = fs.readFileSync('book.xml', 'utf8');
    const obj = parse(xml);
    
    fs.writeFileSync('book.json', JSON.stringify(obj));
    
    console.log(inspect(obj));
})();