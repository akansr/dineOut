import * as request from 'request-promise';

export class DineOutDBAPI {
    private url;

    constructor(apiUrl: string) {
        this.url = apiUrl;
    }

    async getRestaurantStats(id: string) {
        const options = {
            uri: `${this.url}/restaurants/${id}`,
            method: 'GET',
            json: true
        };

        const res = await request(options);
        return res.restaurant;
    }

    async getRestaurants(user_id: string) {
        const options = {
            uri: `${this.url}/users/${user_id}/restaurants`,
            method: 'GET',
            json: true
        };

        return await request(options);
    }
}
