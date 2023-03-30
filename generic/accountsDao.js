import res from 'express/lib/response.js';
import { connectToDatabase } from '../utils/dbconnection.js'

const collection = 'accounts'
const { db, ObjectId } = await connectToDatabase()

class accountsDao {

  constructor() {

  }

  async findData() {
    var result = await db.collection(collection).find({}).toArray();
    return result;
  }

  async findDataById(id) {
    var result = await db.collection(collection).find({ "_id": { $eq: new ObjectId(id) } }).toArray();
    return result;
  }

  async insertData(requestPayload) {
    var result = await db.collection(collection).insertOne(requestPayload)
    return result
  }

  async updateData(requestPayload) {
    const accountsInput = requestPayload
    var result = await db.collection(collection).updateOne({ "_id": { $eq: new ObjectId(accountsInput._id) } }, {
      $set:
      {
        account_id: accountsInput.account_id,
        limit: accountsInput.limit,

      }
    }, { returnNewDocument: true })
    return result;
  }

  async deleteData(id) {
    var result =   await db.collection(collection).deleteOne({ "_id": { $eq: new ObjectId(id) } })
    return result;
  }
}

export default accountsDao
