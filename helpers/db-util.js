import { MongoClient } from 'mongodb';

export const connect = async () => {
  const client = await MongoClient.connect(
    'mongodb+srv://alex:andaluzia231178@cluster0.vndt4.mongodb.net/events?retryWrites=true&w=majority'
  );
  return client;
};

export const insertDocument = async (client, collection, document) => {
  const db = client.db();
  return await db.collection(collection).insertOne(document);
};
