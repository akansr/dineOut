import * as request from 'request-promise';
import {IRestaurantRecommender} from "./IRestaurantRecommender";

export class RestaurantRecommender implements IRestaurantRecommender {
    private TYPE: string = "restaurant";
    private RADIUS: string = "500";
    private apiUrl;
    private apiKey;
    constructor(api, apiKey){
        this.apiUrl = api;
        this.apiKey = apiKey;
    }

    public async getPlaces(area: string) {
        console.log('Getting places');
        const uri: string = this.buildUri(area);
        const options = {
            uri: uri,
            method: 'GET',
            json: true
        };

        const response = await request(options);

        const results = this.parsePlaces(response.results);
        const details = results.map(async (each) => await this.getDetails(each.id));

        console.log(`Getting details`);
        return await Promise.all(details);
    }

    public async getName(place_id: string) {
        const uri = `${this.apiUrl}/details/json?placeid=${place_id}&fields=name&key=${this.apiKey}`;
        const options = {
            uri: uri,
            method: 'GET',
            json: true
        };
        const response = await request(options);
        this.throwErrorIfInvalidSearch(response);

        return response.result.name;

    }

    private throwErrorIfInvalidSearch(response) {
        if(response.status == "INVALID_REQUEST") {
            throw new Error(`Please provide a valid id.`);
        }
    }

    private async getDetails(place_id: string) {
        const uri = `${this.apiUrl}/details/json?placeid=${place_id}&fields=name,rating,reviews,geometry&key=${this.apiKey}`;
        const options = {
            uri: uri,
            method: 'GET',
            json: true
        };

        const response = await request(options);
        return this.parseDetails(place_id, response.result);
    }

    private buildUri(area: string) {
        const googlePlacesAPI: string = `${this.apiUrl}/textsearch/json?query=`;
        const query: string = encodeURIComponent(area);
        const radius: string = this.RADIUS;
        const type: string = this.TYPE;
        const apiKey: string = this.apiKey;

        const uri: string = `${googlePlacesAPI}${query}&type=${type}&radius=${radius}&key=${apiKey}`;

        return uri;
    }

    private parsePlaces(results) {
        const restaurants = [];
        results.forEach((place) => restaurants.push({
            id : place.place_id
        }));

        return restaurants;
    }

    private parseDetails(place_id, result) {
        return {
            place_id: place_id,
            name: result.name,
            rating: result.rating,
            reviews: result.reviews.map(review => JSON.stringify(review.text))
        }
    }
}
