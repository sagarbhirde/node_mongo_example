import res from 'express/lib/response.js';
import { connectToDatabase } from '../utils/Dbconnection.js'

const { db, ObjectId } = await connectToDatabase()
class Base {
    constructor() {

    }

    async findData(collection) {
        var result = await db.collection(collection).find({}).toArray();
        return result;
    }

    async findDataById(collection, id) {
        var result = await db.collection(collection).find({ "_id": { $eq: new ObjectId(id) } }).toArray();
        return result;
    }

    async insertData(collection, requestPayload) {
        var result = await db.collection(collection).insertOne(requestPayload)
        return result
    }

    // async updateData(collection, requestPayload) {
    //     const accountsInput = requestPayload
    //     const newData={}
    //     for (const key in accountsInput) {
    //         if (accountsInput.hasOwnProperty(key) && key!='_id') {
    //             console.log(`${key}: ${accountsInput[key]}`);
    //             newData[key]=accountsInput[key]
    //         }
    //     }
    //     var result = await db.collection(collection).updateOne({ "_id": { $eq: new ObjectId(accountsInput._id) } }, {
    //         $set:
    //         {
    //             newData
    //         }
    //     }, { returnNewDocument: true })
    //     return result;
    // }

    async deleteData(collection, id) {
        var result = await db.collection(collection).deleteOne({ "_id": { $eq: new ObjectId(id) } })
        return result;
    }
}

export default Base