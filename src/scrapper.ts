import { MongoHelper } from './mongoclient';
const axios = require('axios').default;
import cheerio from 'cheerio'

export class Scrapper {
    private root: string;
    private relativeUrl: string;
    private mongoConnection: any;

    constructor(root:string, relativeUrl:string) {
        this.root = root;
        this.relativeUrl = relativeUrl;
        this.mongoConnection = MongoHelper.connect('mongodb://localhost:27017/ocremix');
    }

    public scrape = async () => {
        let url;
        let httpCalls = [];
        for(let counter = 1; counter < 20; counter++) {
            url = this.getFullUrl(counter);
            httpCalls.push(this.getOCRemixdata(url));
            if(counter % 10 == 0) {
                await Promise.all(httpCalls);                             
                httpCalls.length = 0;
            }
            console.log('Current URL:', url);
        }
    }

    private getOCRemixdata = (url: string): Promise<any> => {
        return axios.get(url)
        .then((response: any) => {
            this.parseHtml(response);
        }).catch((err:any) => console.log('Failed to fetch URL: ', url));
    }

    private getFullUrl = (counter: number): string => {
        const ocremixNum = new String(counter);
        return this.root + this.relativeUrl + ocremixNum.padStart(5, '0');
    }

    private parseHtml = async (html: any): Promise<void> => {
        
        try{                   
            console.log('\nHTTP status: ', html.status);
            const parsedHtml = cheerio.load(html.data);
           
            if(html.status > 199 && html.status < 400) {
                console.log('Valid JSON');
                await this.mongoConnection.insert({'name':'test'});
            } else {
                console.log('Not a calid game URL: ', html);
            }
        }catch(e) {
            console.log('Error: ', e);
        }
    }
}