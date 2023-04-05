import express from 'express'
import { check, validationResult } from 'express-validator'
import accountsDao from '../generic/AccountsDao.js'
var accounts = new accountsDao();
const router = express.Router()
const collection = 'accounts'

// validations

const validateInputs = [
    check('account_id', 'Account ID Should not be null').not().isEmpty(),
    check('limit', 'Limit should be range in 1000 to 5000').isInt({ min: 1000, max: 5000 }),
    check('products', " Data should be in array").isArray()
]


// GET List of documents
router.get("/", async (req, res) => {
    try {
       const accountsData = await accounts.findData(collection);
        res.status(200).json(accountsData)  //return documents
    } catch (err) {
        res.status(500).json({ "error": err.message })
    }
})

function parseData(result,accountsSchema){
    
}

//GET document based on id
router.get("/:id", async (req, res) => {
    try {
        var result = await accounts.findDataById(collection,req.params.id);
        return res.status(200).json(result)
    } catch (err) {
        res.status(500).json({ "error": err.message })
    }
})


//POST insert document
router.post('/',  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json(({
            errors: errors.array()
        }))
    } else {
        try {
            var result = await accounts.insertData(collection,req.body);
            res.status(201).send(result)
        } catch (error) {
            res.status(400).json(error)
        }
    }
})

//PUT update document
router.put('/', validateInputs, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json(({
            errors: errors.array()
        }))
    } else {
        try {
            var result = await accounts.updateData(collection,req.body);
            res.status(202).send(result)
        } catch (error) {
            res.status(400).json(error)
        }
    }
})

//DELETE delte document
router.delete("/:id", async (req, res) => {
    try {
        var result = await accounts.deleteData(collection,req.params.id);
        res.status(202).send(result)
    } catch (error) {
        res.status(400).json(err)
    }
})

export default router