const rp = require('request-promise');
const url = 'https://ocremix.org/remix/OCR00001';
const $ = require('cheerio');

rp(url)
    .then(function(html) {
        // console.log('Html: ', html);
        // console.log('Anchor Tag: ', $("h1", html)['0'].children);
        const h1Tags = $("h1", html)['0'].children;
        // console.log('typeof list:', typeof(h1Tags), 'Conent: ', h1Tags);
        const stuff = h1Tags.filter(function(element){
            
            if(element.data && element.data != '\n') {
                console.log('Item:', element.data);
            }
            return element.data ? element.data : false;
        });
        
    })
    .catch(function(e) {
        console.log('error: ', e);
    });