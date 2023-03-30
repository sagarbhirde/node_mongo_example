import mongodb from 'mongodb'
const { MongoClient, ObjectId } = mongodb

import { config } from 'dotenv'
config()

const { MONGODB_URI, MONGODB_DB } = process.env

let cached = global.mongo

if (!cached) {
  cached = global.mongo = { conn: null, promise: null }
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }

    cached.promise = MongoClient.connect(MONGODB_URI, opts).then((client) => {
      return {
        client,
        db: client.db(MONGODB_DB),
        ObjectId: ObjectId
      }
    }).catch((error) => {
      throw new Error(
        `Issue while connecting DB ${error}`
      )
    }).finally(() => {
      console.log(' Connected to MongoDB')
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}

export { MONGODB_DB, MONGODB_URI }

