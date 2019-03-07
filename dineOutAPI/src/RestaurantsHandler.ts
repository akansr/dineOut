const config = require('config');
import {Restaurants} from "./lib/Restaurants";

export class restaurantsHandler {
    public async process(req, res) {
        try {
            console.log(`Processing request...`);
            const location = req.query;
            this.validateRequest(location);

            const recommenderUrl = config.get('recommenderApi');
            const analyzerUrl = config.get('analyzerApi');
            const dbApiUrl = config.get('dineOutDBApi');
            const restaurants = new Restaurants(recommenderUrl, analyzerUrl, dbApiUrl);

            const restaurantsBasedOnLocation = await restaurants.getBasedOnLocation(location.query);

            return res
                .status(200)
                .send({restaurants: restaurantsBasedOnLocation});
        } catch (error) {
            res.status(404).send(`Error: ${error.message}`);
        }
    }

    private validateRequest(json) {
        if(json.query == null) {
            throw new Error(`Please provide a query.`);
        }
    }
}
