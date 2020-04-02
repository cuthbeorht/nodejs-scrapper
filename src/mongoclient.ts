import * as mongo from 'mongodb';

export class MongoHelper {
    public static client: mongo.MongoClient;

    constructor() {
        MongoHelper.connect('mongodb://localhost:27017/games');
    }

    public static connect(url: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            mongo.MongoClient.connect(url, {useNewUrlParser: true}, (err, client: mongo.MongoClient) => {
                if (err) {
                    reject(err);
                } else {
                    MongoHelper.client = client;
                    resolve(client);
                }
            });
        });
    }

    public disconnect(): void {
        MongoHelper.client.close();
    }
 }