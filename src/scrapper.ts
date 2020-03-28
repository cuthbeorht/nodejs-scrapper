
import { parse } from 'node-html-parser';
const axios = require('axios').default;

export class Scrapper {
    private root: string;
    private relativeUrl: string;

    constructor(root:string, relativeUrl:string) {
        this.root = root;
        this.relativeUrl = relativeUrl;
    }

    public scrape = (): void => {
        let url;
        for(let counter = 0; counter < 99999; counter++) {
            url = this.getFullUrl(counter);
            this.getOCRemixdata(url);
            console.log('Current URL:', url);
        }
    }

    private getOCRemixdata = (url: string): void => {
        const htl = axios.get(url)
            .then(function(html: any)  {
                console.log('HTML: ', html)
            });


    }

    private getFullUrl = (counter: number): string => {
        const ocremixNum = new String(counter);
        return this.root + this.relativeUrl + ocremixNum.padStart(5, '0ya');
    }
}