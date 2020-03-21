import mongodb, { Db } from 'mongodb';

const MongoClient = mongodb.MongoClient;
let cachedDb: Db | null = null;

//  === Database Connection === //
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

//  === General CRUD Operations Using MongoDB === //
export const get = async <Output>(collection: string, args: object): Promise<Output | null> => {
    try {
        console.log('Get', { collection, args });
        const client = (await connectToDatabase(process.env.MONGODB_URI!)).collection(collection);
        return await client.findOne<Output>({ ...args });
    } catch (err) {
        return err;
    }
};

export const find = async <Output = any>(collection: string, args: object): Promise<Output[] | null> => {
    try {
        console.log('Find', { collection, args });
        const client = (await connectToDatabase(process.env.MONGODB_URI!)).collection(collection);
        return await client.find<Output>({ ...args }).toArray();
    } catch (err) {
        return err;
    }
};

export const insert = async <Output>(collection: string, args): Promise<Output> => {
    try {
        args.createdAt = new Date();
        args.updatedAt = null;
        console.log('Insert', { collection, args });
        const client = (await connectToDatabase(process.env.MONGODB_URI!)).collection(collection);
        return (await client.insertOne(args)).ops[0];
    } catch (err) {
        return err;
    }
};

export const update = async <Output>(collection: string, filter: object, args): Promise<Output> => {
    try {
        delete args._id; // _id is immutable
        args.updatedAt = new Date();
        console.log('Update', { collection, filter, args });
        const client = (await connectToDatabase(process.env.MONGODB_URI!)).collection(collection);
        const res = await client.findOneAndUpdate(filter, { $set: args }, { returnOriginal: false });
        return res.value || Promise.reject('Document does not exist'); // res.value should exist if update was successful
    } catch (err) {
        return err;
    }


};
