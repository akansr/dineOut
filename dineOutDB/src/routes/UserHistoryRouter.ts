import express = require('express');
import {UserHistoryHandler} from "../handlers/UserHistoryHandler";
const router = express.Router();
const db = require('../models');


router.post('/:username/restaurants/:place_id/like', (req, res) =>
    new UserHistoryHandler(db.users).processRestaurantLike(req, res));

router.post('/:username/restaurants/:place_id/dislike', (req, res) =>
    new UserHistoryHandler(db.users).processRestaurantDislike(req, res));

router.post('/:username/restaurants/:place_id/visit', (req, res) =>
    new UserHistoryHandler(db.users).processRestaurantVisit(req, res));

router.get('/:username/restaurants', (req, res) =>
    new UserHistoryHandler(db.users).processHistory(req, res));

module.exports = router;

