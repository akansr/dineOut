const config = require('config');
import {Response} from 'express';
import {Request} from 'express';
import {IHandler} from "./IHandler";
import {RestaurantRecommender} from "./RestaurantRecommender";

export class GetRestaurantsHandler implements IHandler {
    async process(req, res) {
        try {
            const query = req.query;
            const api = config.get('googlePlacesApi');
            const apiKey = process.env.API_KEY;
            console.log(`Api key: ${apiKey}`);
            console.log(`Api: ${api}`);
            const restaurantRecommender = new RestaurantRecommender(api, apiKey);
            const restaurantIds = await restaurantRecommender.getPlaces(query.query);

            res.status(200).json({restaurantIDs: restaurantIds});
        } catch (err) {
            res.status(404).json(`Error: ${err.message}`);
        }

    }
}
