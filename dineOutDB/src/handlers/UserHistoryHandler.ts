import {Response} from 'express';
import {Request} from 'express';

export class UserHistoryHandler {
    private dbUsers;
    constructor(db) {
        this.dbUsers = db;
    }

    public async processRestaurantLike(req, res) {
        try {
            console.log(req.params);
            this.validateRestaurantVisitRequest(req.params);

            await this.dbUsers.update(
                { like: true },
                {where: {
                    username: req.params.username,
                    placeId: req.params.place_id,
                }
            });

           return res.sendStatus(201);
        } catch (error) {
            console.log(`Error: ${error.message}`);
            res.status(404).send(`Error: ${error.message}`);
        }
    }

    public async processRestaurantDislike(req, res) {
        try {
            this.validateRestaurantVisitRequest(req.params);

            await this.dbUsers.update(
                { dislike: true },
                {where: {
                        username: req.params.username,
                        placeId: req.params.place_id,
                    }
                });

            return res.sendStatus(201);
        } catch (error) {
            console.log(`Error: ${error.message}`);
            res.status(404).send(`Error: ${error.message}`);
        }
    }

    public async processRestaurantVisit(req, res) {
        try {
            console.log(req.params);
            this.validateRestaurantVisitRequest(req.params);

            await this.dbUsers.findOrCreate({
                where: {
                    username: req.params.username,
                    placeId: req.params.place_id
                }
            });

            res.sendStatus(201);
        } catch (error) {
            console.log(`Error: ${error.message}`);
            res.status(404).send(`Error: ${error.message}`);
        }
    }

    public async processHistory(req, res) {
        try {
            this.validateProcessHistoryRequest(req.params);
            const response = await this.dbUsers.findAll({
                where: {
                    username: req.params.username
                }
            });

            res.json({restaurants: response});
        } catch (error) {
            console.log(`Error: ${error.message}`);
            res.status(404).send(`Error: ${error.message}`);
        }
    }

    private validateProcessHistoryRequest(json) {
        if(json.username == null) {
            throw new Error(`Please provide valid username.`);
        }
    }

    private validateRestaurantVisitRequest(json) {
        if(json.username == null || json.place_id == null) {
            throw new Error(`Please provide valid username and/or place id`);
        }
    }
}
