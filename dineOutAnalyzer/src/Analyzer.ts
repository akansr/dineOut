const Sentiment = require('sentiment');

import {IAnalyzer} from "./IAnalyzer";

export class Analyzer implements IAnalyzer{
    private _sentiment;

    constructor() {
        this._sentiment = new Sentiment();
    }

    public analyze(text: string): number {
        return this._sentiment.analyze(text).score;
    }
}
