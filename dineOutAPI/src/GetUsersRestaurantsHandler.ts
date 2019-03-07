const config = require('config');

import {Restaurants} from "./lib/Restaurants";

export class GetUsersRestaurantsHandler {
    public async process(req, res) {
            try {
                console.log(`Processing request...`);
                const user = req.params;
                console.log(user);
                const recommenderUrl = config.get('recommenderApi');
                const analyzerUrl = config.get('analyzerApi');
                const dbApiUrl = config.get('dineOutDBApi');
                const restaurants = new Restaurants(recommenderUrl, analyzerUrl, dbApiUrl);
                const restaurantsByUser = await restaurants.getBasedOnUser(user.user_id);

                return res
                    .status(200)
                    .json({restaurants: restaurantsByUser});
            } catch (error) {
                res.status(404).send(`Error: ${error.message}`);
            }
        }

}
