
let express = require('express')
let router = express.Router()

let stateData = require('./state_fact.json')

// Permit requests from fetch requests in browsers 
router.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    next()
})


router.get('/about', function(req, res, next) {
    return res.json({
        'about': 'A state fact API to demonstrate some Express concepts.'
    })
})

router.get('/state-list', function(req, res, next) {
    let stateNames = Object.keys(stateData)  // array of all the keys from the object
    res.json(stateNames)
})

// /fact/Minnesota responds with a fact about Minnesota
// /fact/qwerty responds with 404 State Not Found 
router.get('/fact/:stateName', function(req, res, next){
    let stateName = req.params.stateName 
    let fact = 'This state is home to ' + stateData[stateName]
    if (fact) {
        res.json({ name: stateName, fact: fact })
    } else {
        res.status(404).send('State not found')
    }

    /* To send an error to the error handlers
    next(Error('Oops')) // not in a callback/then/catch
    return next(Error('Oops'))  // from a callback/then/catch
    You'd obviously provide more useful info in the message.
    You may have an error object, for example, from Sequelize, that you can pass to the error handler. 
    */
})

router.get('/fact/letter/:letter', function(req, res, next) {
    let initial = req.params.letter 
    let states = {}
    for (state in stateData) {
        if (state.startsWith(initial)) {
            states[state] =  stateData[state]
        }
        
    }
    res.json(states)
    // let states = stateData.filter( sd => sd.
})

module.exports = router