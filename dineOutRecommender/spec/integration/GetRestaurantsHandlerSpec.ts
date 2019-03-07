import chai = require('chai');
import {expect} from 'chai';

import chaihttp = require('chai-http');
chai.use(chaihttp);
import httpMocks = require('node-mocks-http');
import {GetRestaurantsHandler} from "../../src/GetRestaurantsHandler";
import {GetRestaurantNameHandler} from "../../src/GetRestaurantNameHandler";

describe('GetRestaurantsHandler', function () {
    describe('GET /restaurants?query=', function () {
        describe('#process', function () {
            it('should return a status code of 200, if the request is successful', async function () {
                // Arrange
                let query = "italian+in+jersey+city";
                let handler = new GetRestaurantsHandler();
                let res = httpMocks.createResponse();
                let req = httpMocks.createRequest({
                    method: 'GET',
                    url: `/restaurants?query=${query}`,
                    query: {
                        query: query
                    }
                });

                // Act
                await handler.process(req, res);

                // Assert
                expect(res.statusCode).to.equal(200);
            });

            it('should return a json containing list of restaurant ids', async function () {
                // Arrange
                let query = "italian+in+jersey+city";
                let handler = new GetRestaurantsHandler();
                let res = httpMocks.createResponse();
                let req = httpMocks.createRequest({
                    method: 'GET',
                    url: `/restaurants?query=${query}`,
                    query: {
                        query: query
                    },
                });

                // Act
                await handler.process(req, res);

                // Assert
                expect(res).to.be.json;
            });

            it('should return a empty list, if requested place does not exist', async function () {
                // Arrange
                let query = "";
                let handler = new GetRestaurantsHandler();
                let res = httpMocks.createResponse();
                let req = httpMocks.createRequest({
                    method: 'GET',
                    url: `/restaurants?query=${query}`,
                    query: {
                        query: query
                    },
                    json: true
                });

                // Act
                await handler.process(req, res);

                // Assert
                expect(res.statusCode).to.equal(200);
                expect(JSON.parse(res._getData()).restaurantIDs).to.be.empty;
            });

            xit('should return a status code 404, if its a bad request', async function () {
            });
        });
    });
});
