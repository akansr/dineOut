import { expect } from 'chai';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
const nock = require('nock');

import {RestaurantRecommender} from "../../src/RestaurantRecommender";



describe('RestaurantRecommender', function () {
    this.timeout(30000);
    let restaurantRecommender;
    const api = "http://fake-url";
    const apiKey = "fake-api-key";
    before(function () {

        restaurantRecommender = new RestaurantRecommender(api, apiKey);
    });

    describe('#getPlaces', function () {
        // TODO: get back and figure out the issue with nock, its not catching the request being made
        xit('should return a list of place(s) containing their ids', async function () {
            // Arrange
            const query: string = "italian+in+jersey+city";
            const random_id = "random-id";
            nock(api)
                .get(`/textsearch/json?query=${query}`)
                .reply(200, { results: [{place_id : "random-id"}]
                });

            nock(api)
                .get(`/details/json?placeid=${random_id}&fields=name,rating,reviews,geometry&key=${apiKey}`)
                .reply(200, { results: [{
                    name : "random name",
                    rating: "4",
                    reviews: []
                }]
                });
            // Act
            const actualPlaces = await restaurantRecommender.getPlaces(query);

            // Assert
            expect(Object.keys(actualPlaces[0])).to.contain("id");
        });

        xit('should throw an error if the area does not exist', function () {
        });
    });

    describe('#getName', function () {
        it('should return name of the given place id',async  function () {
            // Arrange
            const expectedName: string = "Made In Italy Pyrmont";
            const place_id: string = "ChIJy9gX4zOuEmsR_xCZ2U9nf_g";

            nock(api)
                .get(`/details/json?placeid=${place_id}&fields=name&key=${apiKey}`)
                .reply(200, { result: {name : expectedName}
                });
            // Act
            const name = await restaurantRecommender.getName(place_id);

            // Assert
            expect(name).to.equal(expectedName);
        });

        // TODO: issue with rejectedWith, need a better way to catch the error being thrown
        xit('should return an error if the place does not exist', async function () {
            // Arrange
            const expectedError: string = `Please provide a valid id.`;
            const place_id: string = "does-not-exist";

            nock(api)
                .get(`/details/json?placeid=${place_id}&fields=name&key=${apiKey}`)
                .reply(200, { status : "INVALID_REQUEST"
                });
            // Act


            // Assert
           // expect(await restaurantRecommender.getName(place_id)).to.be.rejectedWith(Error, expectedError);
        });
    });
});
