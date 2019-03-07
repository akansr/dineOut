import * as request from 'request-promise';

export class RecommenderAPI {
    private url;

    constructor(apiUrl: string) {
      this.url = apiUrl;
    }

    public async getPlaces(query: string) {
        console.log(`Getting places.`);

        const options = {
            uri: `${this.url}/restaurants?query=${query}`,
            json: true
        };
        const response = await request(options);
        return response.restaurantIDs;
    }

    public async getName(place_id: string) {

        const options = {
            uri: `${this.url}/restaurants/${place_id}/name`,
            json: true
        };
        const response = await request(options);
        return response.name;
    }
}
