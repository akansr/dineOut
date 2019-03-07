import * as request from 'request-promise';

export class AnalyzerAPI {
    private url;

    constructor(apiUrl: string) {
        this.url = apiUrl;
    }

    async analyze(text: string) {
        const options = {
            uri: `${this.url}/polarity`,
            method: 'POST',
            body: {
                text: text
            },
            json: true
        };

        return await request(options);
    }
}
