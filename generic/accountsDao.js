import res from 'express/lib/response.js';
import accountsSchema from '../models/AccountsSchema.js';
import { connectToDatabase } from '../utils/Dbconnection.js'
import Base from './Base.js';
const { db, ObjectId } = await connectToDatabase()

class AccountsDao extends Base {

  constructor() {
    super();
  }

  getParsedAccountsData(accounts) {
    return accounts.map(account => {
      const transformedAccounts = {};
      Object.keys(accountsSchema).forEach(key => {
        transformedAccounts[key] = account[key];
      });
      return transformedAccounts;
    });
  }

  async findData(collection) {
    var accounts = await super.findData(collection);
    return this.getParsedAccountsData(accounts);
  }

  async findDataById(collection,id) {
    var accounts = await super.findDataById(collection, id);
    return this.getParsedAccountsData(accounts);
  }

  async updateData(collection, requestPayload) {
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
}


export default AccountsDao
