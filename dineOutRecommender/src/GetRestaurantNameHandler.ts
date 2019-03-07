const config = require('config');

import {IHandler} from "./IHandler";
import {RestaurantRecommender} from "./RestaurantRecommender";

export class GetRestaurantNameHandler implements IHandler {
    async process(req, res) {
        try {
            const query = req.params;
            console.log('Querying for: ' + JSON.stringify(query));
            const api = config.get('googlePlacesApi');
            const apiKey = process.env.API_KEY;
            const restaurantRecommender = new RestaurantRecommender(api, apiKey);
            const restaurantName = await restaurantRecommender.getName(query.place_id);
            return  res.status(200).json({name: restaurantName});
        } catch (error) {
            res.status(404).json(`Error: ${error.message}`);
        }

    }
}
