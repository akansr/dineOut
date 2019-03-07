import {DineOutDBAPI} from "../services/DineOutDBAPI";


import {RecommenderAPI} from "../services/RecommenderAPI";
import {AnalyzerAPI} from "../services/AnalyzerAPI";
import {IRestaurants} from "./IRestaurants";

export class Restaurants implements IRestaurants{
    private recommenderApi;
    private analyzerApi;
    private dineOutDBApi;


    constructor(recommenderApiBaseUrl, analyzerApiBaseUrl, dbApiBaseUrl) {
        this.recommenderApi = new RecommenderAPI(recommenderApiBaseUrl);
        this.analyzerApi = new AnalyzerAPI(analyzerApiBaseUrl);
        this.dineOutDBApi = new DineOutDBAPI(dbApiBaseUrl);
    }

    public async getBasedOnLocation(location) {
        try {
            const restaurantIds = await this.recommenderApi.getPlaces(location);
            const restaurants = await this.getDetailsForRestaurants(restaurantIds);
            const sortedRestaurantsDetails = this.sortDetailsBasedOnReviews(restaurants);

            return sortedRestaurantsDetails;
        } catch (error) {
            console.log(`Error message: ${error.message}`);
            return error.message;
        }
    }

    public async getBasedOnUser(user_id: string) {
        try {
            const restaurants = await this.dineOutDBApi.getRestaurants(user_id);
            const restaurantsWithNames = restaurants.restaurants.map(async (restaurant) => {
                const name = await this.recommenderApi.getName(restaurant.placeId);
                restaurant.name = name;
                return restaurant;
            });

            return await Promise.all(restaurantsWithNames);
        } catch (error) {
            console.log(`Error message: ${error.message}`);
            return error.message;
        }
    }
    private async getDetailsForRestaurants(restaurantIds) {
        const details = restaurantIds.map(async (restaurant) => {
            restaurant.score = await this.getPolarityScoreForARestaurant(restaurant.reviews);
            const stats = await this.dineOutDBApi.getRestaurantStats(restaurant.place_id);
            restaurant.likes = stats.likes;
            restaurant.dislikes = stats.dislikes;
            return restaurant;
        });

        return await Promise.all(details);
    }

    private async getPolarityScoreForARestaurant(reviews) {
        const polarityScore = await Promise.all(reviews.map(async (review) =>
            await this.analyzerApi.analyze(review)));

        let score = 0;
        polarityScore.forEach((each: any) =>
            score += parseInt(each.score));
        return score;
    }

    private sortDetailsBasedOnReviews(analyzedRestaurantDetails) {
        return analyzedRestaurantDetails
            .sort((one, two) =>  two.score - one.score);
    }

}
