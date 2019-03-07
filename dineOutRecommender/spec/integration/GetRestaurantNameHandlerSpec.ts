import chai = require('chai');
import {expect} from 'chai';
import chaihttp = require('chai-http');
chai.use(chaihttp);
import httpMocks = require('node-mocks-http');
import {GetRestaurantNameHandler} from "../../src/GetRestaurantNameHandler";


describe('GetRestaurantNameHandler', function () {
    describe('GET /restaurants/:place_id/name', function () {
        describe('process', function () {
            it('should return a status code 200, if the request is successful', async function () {
                // Arrange
                let id = "ChIJd2od6q5QwokRcWX43MPwpAc";
                let handler = new GetRestaurantNameHandler();
                let res = httpMocks.createResponse();
                let req = httpMocks.createRequest({
                    method: 'GET',
                    url: `/restaurants/${id}/name`,
                    params: {
                        place_id: id
                    },
                    json: true
                });

                // Act
                await handler.process(req, res);

                // Assert
                expect(res.statusCode).to.equal(200);
            });

            it('should return a status code 404, if its a bad request', async function () {
                // Arrange
                let id = "does-not-exist";
                let handler = new GetRestaurantNameHandler();
                let res = httpMocks.createResponse();
                let req = httpMocks.createRequest({
                    method: 'GET',
                    url: `/restaurants/${id}/name`,
                    params: {
                        place_id: id
                    },
                    json: true
                });

                // Act
                await handler.process(req, res);

                // Assert
                expect(res.statusCode).to.equal(404);
            });
        });
    });
});
