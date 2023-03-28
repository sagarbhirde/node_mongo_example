import express from 'express'
import { connectToDatabase } from '../utils/dbconnection.js'
import { check , validationResult } from 'express-validator'

const router = express.Router()
const collection = 'accounts'
const {db, ObjectId } = await connectToDatabase()

// validations

const validateInputs = [
check('account_id', 'Account ID Should not be null').not().isEmpty(),
check('limit', 'Limit should be range in 1000 to 5000').isInt({ min:1000, max : 5000}),
check('products', " Data should be in array").isArray()
]


// GET List of documents
router.get("/",async (req,res) => {
    try{
      var result =await  db.collection(collection).find({}).toArray();
                res.status(200).json(result)  //return documents
    }catch (err){
        res.status(500).json({"error": err.message})
    }
})

//GET document based on id
router.get("/:id",async (req,res) => {
    try{
       var result = await db.collection(collection).find({ "_id" :{ $eq:new ObjectId(req.params.id)}}).toArray();
       return res.status(200).json(result)
    }catch (err){
        res.status(500).json({ "error" : err.message})
    }
})


//POST insert document
router.post('/',validateInputs,async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json(({
            errors : errors.array()
        }))
    }else{
        await db.collection(collection).insertOne(req.body).then(result => res.status(201).send(result)) //return inserted document
        .catch(err => res.status(400).json(err))
    }
})

//PUT update document
router.put('/', validateInputs, async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json(({
            errors :errors.array()
        }))
    }else{
        const accountsInput = req.body
        await db.collection(collection).updateOne({ "_id": { $eq : new ObjectId(req.body._id)}},{
            $set:
            {
                account_id:accountsInput.account_id,
                limit:accountsInput.limit,

            }
        },{ returnNewDocument :true})
        .then(result => res.status(202).send(result))
        .catch(err => res.status(400).json(err))
    }
})

//DELETE delte document
router.delete("/:id",async (req,res) =>{
    await db.collection(collection).deleteOne({ "_id": { $eq: new ObjectId(req.params.id)}})
    .then(result => res.status(202).send(result))
    .catch(err => res.status(400).json(err))
})

export default router