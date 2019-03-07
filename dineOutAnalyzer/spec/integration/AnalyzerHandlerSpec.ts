import {expect} from 'chai';
import httpMocks = require('node-mocks-http');

import {AnalyzerHandler} from "../../src/AnalyzerHandler";

describe('AnalyzerHandler', function () {
    describe('POST', function () {
        describe('#process', function () {
            it('should return a status code of 201, if the request is successful', function () {
                // Arrange
                let handler = new AnalyzerHandler();
                let res = httpMocks.createResponse();
                let req = httpMocks.createRequest({
                    method: 'POST',
                    body: {
                        text : "i love pizza"
                    }
                });

                // Act
                handler.process(req, res);

                // Assert
                expect(res.statusCode).to.equal(201);
            });

            it('should return the response containing the polarity score, if successful', function () {
                // Arrange
                const expectedScore = 3;
                let handler = new AnalyzerHandler();
                let res = httpMocks.createResponse();
                let req = httpMocks.createRequest({
                    method: 'POST',
                    body: {
                        text : "i love pizza"
                    }
                });
                // Act and Assert
                handler.process(req, res);

                const actualResponseBody = JSON.parse(res._getData());
                expect(actualResponseBody.score).to.equal(expectedScore);
            });
        });
    });
});
