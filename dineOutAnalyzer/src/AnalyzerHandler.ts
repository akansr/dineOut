import {Response} from 'express';
import {Request} from 'express';
import {Analyzer} from "./Analyzer";
import {IHandler} from "./IHandler";

export class AnalyzerHandler implements IHandler {
    process(req: Request, res: Response) {
        const analyzer = new Analyzer();
        const score = analyzer.analyze(req.body.text);
        return res
            .status(201)
            .json({"score": score});
    }
}
