import {Response} from 'express';
import {Request} from 'express';
const jwt = require('jsonwebtoken');

export class UserRegisterHandler {
    private dbUserLogin;
    private secretKey = "TO DO get it from config";
    constructor(db) {
        this.dbUserLogin = db;
    }

    public async process(req, res) {
        try {
            this.validate(req.body);

            const user = await this.dbUserLogin.create({
                username: req.body.username,
                password: req.body.password

            });
            const json = this.buildResponseJson(user);
            res.status(200).send(json);
        } catch (error) {
            console.log(`Error: ${error.message}`);
            res.status(404).send(`Error: ${error.message}`);
        }
    }

    private buildResponseJson(user) {
        let token = jwt.sign({
            id: user.id },
            this.secretKey,
            {expiresIn: 86400 // expires in 24 hours
        });

        return { auth: true, token: token, user: user.username }
    }

    private validate(json) {
        if(json.username == null || json.password == null) {
            throw new Error(`Please provide valid username and password`);
        }
    }
}
