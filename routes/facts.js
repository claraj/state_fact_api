
let express = require('express')
let router = express.Router()

let stateData = require('./state.json')

router.get('/state-list', function(req, res, next) {
    let stateNames = Object.keys(stateData)
    res.json(stateNames)
})

// /fact/Minnesota responds with  a fact
// /fact/qwerty responds with 404 State Not Found 
router.get('/fact/:stateName', function(req, res, next){
    let stateName = req.params.stateName 
    let fact = stateData[stateName]
    if (fact) {
        res.json({ name: stateName, fact: fact })
    } else {
        res.status(404).send('State Not Found')
    }
})

module.exports = router