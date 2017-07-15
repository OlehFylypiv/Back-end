const express = require('express');
const router = express.Router();

let users = require('./db');
const bodyParser = require('body-parser');

const Joi = require('joi');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


router.get('/users', (req, res, next) => {
    
    function getParameterByName(name) {
        
        let url = req.url;
        
        name = name.replace(/[\[\]]/g, '\\$&');
        
        let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
        
        let results = regex.exec(url);
        
        if (!results) {
            return null;
        }
    
        if (!results[2]) {
            return '';
        }
    
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
    
    let parametr = getParameterByName('top');

    if (parametr) {
        
        function maxValue(users, parametr) {
        
            let len = users.length;
            let buffArray = [];

            for (let i = 0; i < len; i++) {
                buffArray.push(users[i][`${ parametr }`]);
            }
            
            return Math.max(...buffArray);
        }
    
        let max = maxValue(users, parametr); 
        
        res.send(`${max}`);
    }
    else {
        res.send(users);        
    }
});


router.get('/users/:name', (req, res, next) => {
    
    const user = users.find( (user) => {
        return user.name === req.params.name; // don`t work without return
    });

    res.send(user);
});


router.post('/users', (req, res, next) => {
    
    let user = {
        name: req.body.name,
        scoreTime: req.body.scoreTime, // scoreTime and scoreEat are strings
        scoreEat: req.body.scoreEat
    };
    
    let schema = Joi.object({
        name: Joi.string().min(3).max(12).required(),
        scoreTime: Joi.string().min(1).max(6).required(),
        scoreEat: Joi.string().min(1).max(6).required()
    });

    let resultValidation =  Joi.validate(user, schema);
    
    if (resultValidation.error) {
        throw new Error(resultValidation.error);
    }
   
    // for (let i = 0; i < users.length; i++) { 
    //     if (user['name'] === users[i]['name']) {
    //         throw new Error('This user is already registered');
    //     }
    // } 

    function  isSameName(addUser) {
        return user.name === addUser.name;
    }
        
    if (users.find(isSameName)) {
       throw new Error('This user is already registered');
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