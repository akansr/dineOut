export interface IRestaurantRecommender {
    getPlaces(area: string);
    getName(place_id: string);
}
