/**import mongoose from "mongoose";
import { MongoMemoryServer } from 'mongodb-memory-server';

 This will create an new instance of "MongoMemoryServer" and automatically start it
let mongod =null;


 export const getCollectionNameAndSize=async ()=>{
    return [mongoose.connection.collections[0].collectionName,mongoose.connection.collections[0].countDocuments()];
}
export const connect=async ()=>{
    mongod= await MongoMemoryServer.create();
    const uri = mongod.getUri();

    const options={
        useNewUrlParser:true,
        useUnifiedTopology:true,
        poolSize:10

    };
     mongod.connect(uri,options,(err =>{
         if (err)console.log(err)
         else console.log('Connected to test DB')

     }))
}
export const closeAndDisconnect= async ()=>{
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();

}
export const clearDatabase= async ()=>{
   const collections=  mongoose.connection.collections;
    for (const key in collections){
        await collections[key].deleteMany({});
    }

}
export default {clearDatabase,closeAndDisconnect,connect,getCollectionNameAndSize}
*/

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');


let mongoServer=null;
export async function connect() {
     mongoServer = await MongoMemoryServer.create();
    const uri = await mongoServer.getUri();

    const mongooseOpts = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,

    };
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('debug', { color: false })


    await mongoose.connect(uri, mongooseOpts);
}

export const closeAndDisconnect = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
};
export  const clearDatabase= async ()=>{
    const collections=  mongoose.connection.collections;
    for (const key in collections){
        await collections[key].deleteMany({});
    }

}
export default {
    connect,
    closeAndDisconnect,
    clearDatabase
}
