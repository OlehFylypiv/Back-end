const express = require('express');
const router = express.Router();

let users = require('./db');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


router.get('/users', (req, res, next) => {
    res.send(users);
});


router.get('/users/:name', (req, res, next) => {
    
    const user = users.find( (user) => {
        return user.name === req.params.name;
    });

    res.send(user);
});


router.post('/users', (req, res, next) =>{
    
    let user = {
        name: req.body.name,
        scoreTime: req.body.scoreTime,
        scoreEat: req.body.scoreEat
    };
    
    if (user.name === undefined) {
        throw new Error('Write a user name');
    }

    for (let i = 0; i < users.length; i++) {
        if (user['name'] === users[i]['name']) {
            throw new Error('This user is already registered');
        }
    }
    
    users.push(user);
    res.send(user);
});


router.put('/users/:name', (req, res, next) => {
    
    const user = users.find( (user) => {
        return user.name === req.params.name;
    });

    user.scoreTime = req.body.scoreTime;
    user.scoreEat = req.body.scoreEat;
    
    res.send(user);
});


router.delete('/users/:name', (req, res, next) => {
    
    users = users.filter( (user) => {
        return user.name !== req.params.name;
    });

    res.send(users);
});


module.exports = router;