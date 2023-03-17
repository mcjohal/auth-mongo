import {MongoClient} from 'mongodb';

export async function connectToDatabase(){
    const client = await MongoClient.connect(
     // "mongodb+srv://mari:giniDelia1967@cluster0.aqjbw.mongodb.net/authdb?retryWrites=true&w=majority"
      `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.aqjbw.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`
    );

    return client;
}