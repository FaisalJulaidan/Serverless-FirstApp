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
export const get = async <Output>(collection: string, args: object): Promise<Output | null> => {
    console.log('Get', { collection, args });
    try {
        const client = (await connectToDatabase(process.env.MONGODB_URI!)).collection(collection);
        return await client.findOne<Output>({ ...args });
    } catch (err) {
        console.error(err);
        return err;
    }
};

export const find = async <Output = any>(collection: string, args: object): Promise<Output[] | null> => {
    console.log('Find', { collection, args });
    try {
        const client = (await connectToDatabase(process.env.MONGODB_URI!)).collection(collection);
        return await client.find<Output>({ ...args }).toArray();
    } catch (error) {
        console.error(error);
        return error;
    }
};

export const insert = async <Output>(collection: string, args): Promise<Output> => {
    console.log('Insert', { collection, args });
    try {
        const client = (await connectToDatabase(process.env.MONGODB_URI!)).collection(collection);
        args.createdAt = new Date();
        args.updatedAt = null;
        return (await client.insertOne(args)).ops[0];
    } catch (err) {
        return err;
    }
};

export const update = async (collection: string, filter: object, args): Promise<UpdateWriteOpResult> => {
    console.log('Update', { collection, filter, args });
    try {
        const client = (await connectToDatabase(process.env.MONGODB_URI!)).collection(collection);
        args.updatedAt = new Date();
        const res = await client.findOneAndUpdate(filter, { $set: { name: args.name } });

        console.log(res);
        // if (res.result.nModified == 0) {
        //     return Promise.reject('Nothing was modified');
        // }
        return args;
    } catch (err) {
        console.log('inside errororrrrrrrrr');
        return err;
    }


};
