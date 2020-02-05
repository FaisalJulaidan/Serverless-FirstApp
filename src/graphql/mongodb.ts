import mongodb, { Db, UpdateWriteOpResult } from 'mongodb';

const ObjectId = mongodb.ObjectId;
const MongoClient = mongodb.MongoClient;
let cachedDb: Db | null = null;

const connectToDatabase = async (uri: string) => {
    if (cachedDb) {
        console.log('=> using cached db');
        return Promise.resolve(cachedDb);
    }
    try {
        const db = await MongoClient.connect(uri, { useUnifiedTopology: true });
        cachedDb = db.db('n6lb');
        return cachedDb;
    } catch (err) {
        throw err;
    }
};

//  === General CRUD operations using MongoDB === //
export const findOne = async <Output>(collection: string, args: object): Promise<Output | null> => {
    console.log({ collection, args });
    try {
        const client = (await connectToDatabase(process.env.MONGODB_URI!)).collection(collection);
        return await client.findOne<Output>({ ...args });
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const find = async <Output = any>(collection: string, args: object): Promise<Output[] | null> => {
    console.log({ collection, args });
    try {
        const client = (await connectToDatabase(process.env.MONGODB_URI!)).collection(collection);
        return await client.find<Output>({ ...args }).toArray();
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const insertOne = async <Output>(collection: string, args): Promise<Output> => {
    console.log({ collection, args });
    try {
        const client = (await connectToDatabase(process.env.MONGODB_URI!)).collection(collection);
        args.createdAt = new Date();
        args.updatedAt = null;
        const res = await client.insertOne(args);
        return res.ops[0];
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const updateOne = async (collection: string, filter: object, args): Promise<UpdateWriteOpResult> => {
    console.log({ collection, args });
    try {
        const client = (await connectToDatabase(process.env.MONGODB_URI!)).collection(collection);
        args.updatedAt = new Date();
        return await client.updateOne(filter, { $set: args });
        // const res = await client.updateOne(filter, { $set: args });
        // if (res.result.nModified == 0) {
        //     return res;
        // } else {
        //     return args;
        // }
    } catch (error) {
        console.log(error);
        return error;
    }
};


