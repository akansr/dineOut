import {Response} from 'express';
import {Request} from 'express';
const sequelize = require('sequelize');

export class RestaurantHandler   {
    private dbRestaurants;
    constructor(db ) {
        this.dbRestaurants = db;
    }

    public async processGetRequest(req, res) {
        try {
            console.log(req.params);
            this.validateRestaurantRequest(req.params);

            const restaurant = await this.dbRestaurants.find(
                {where: {
                        placeId: req.params.place_id,
                    }
                });
            if (restaurant) {
                return res.status(200).json({restaurant: restaurant});
            } else {
                return res.status(200).json({restaurant: { likes: 0, dislikes: 0}});

            }
        } catch (error) {
            console.log(`Error: ${error.message}`);
            res.status(404).send(`Error: ${error.message}`);
        }
    }

    public async processLikeRequest(req, res) {
        try {
            // this.validateRestaurantVisitRequest(req.params);

            await this.dbRestaurants.findOrCreate({where: {
                    placeId: req.params.place_id
                }});

            await this.dbRestaurants.update(
                { likes: sequelize.literal('likes + 1') },
                {where: {
                        placeId: req.params.place_id,
                    }
                });
            res.sendStatus(201);
        } catch (error) {
            console.log(`Error: ${error.message}`);
            res.status(404).send(`Error: ${error.message}`);
        }
    }

    public async processDislikeRequest(req, res) {
        try {
           // this.validateRestaurantVisitRequest(req.params);
            await this.dbRestaurants.findOrCreate({where: {
                    placeId: req.params.place_id
                }});

            await this.dbRestaurants.update(
                { dislikes: sequelize.literal('dislikes + 1') },
                {where: {
                        placeId: req.params.place_id,
                    }
                });
            res.sendStatus(201);
        } catch (error) {
            console.log(`Error: ${error.message}`);
            res.status(404).send(`Error: ${error.message}`);
        }
    }

    private validateRestaurantRequest(json) {

    }
}
