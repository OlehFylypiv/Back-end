const express = require('express');
const app = express();


const bestScores = (req, res, next) => {
    
    req.allScores = [1, 5, 10, 15, 16, 20, 0, 3, 4]; // random scores
    req.max = Math.max(...req.allScores);
    
    next();
};


app.use(bestScores);


app.get('/scores', (req, res) => {
    
    res.send(`
        Best Scores Array : ${ req.allScores } 
        and the best score is ${ req.max }
    `);
});


const users = [
    {
        id: 'Oleh',
        topScore: 10
    },
    {
        id: 'Mykola',
        topScore: 20
    },
    {
        id: 'John',
        topScore: 15
    }
];


app.get('/scores/users', (req, res) => {
    res.send(JSON.stringify(users));
});


app.get('/scores/users/:id', (req, res) => {
    
    const user = users.find( (user) => {
        return user.id === req.params.id;
    });

    res.send(user);
});


app.listen(3000, () => {
    console.log('Start! Listen http://localhost:3000');
});