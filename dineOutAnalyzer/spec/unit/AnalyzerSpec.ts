import { expect } from 'chai';
import {Analyzer} from "../../src/Analyzer";
import {IAnalyzer} from "../../src/IAnalyzer";

describe('Analyzer', function () {
    describe('#analyze', function () {
        it('should return a corresponding whole value, when provided with text', function () {
            // Arrange
            const expectedScore = 3;
            const text: string = "i love pizza";
            const analyzer: IAnalyzer = new Analyzer();

            // Act
            const actualScore = analyzer.analyze(text);

            // Assert
            expect(actualScore).to.equal(expectedScore);
        });

        it('should return 0 if empty string is provided', function () {
            // Arrange
            const expectedScore = 0;
            const text: string = "";
            const analyzer: IAnalyzer = new Analyzer();

            // Act
            const actualScore = analyzer.analyze(text);

            // Assert
            expect(actualScore).to.equal(expectedScore);
        });
    });
});
