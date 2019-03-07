import express = require('express');
import {RestaurantHandler} from "../handlers/RestaurantHandler";
const router = express.Router();
const db = require('../models');

router.get('/:place_id', (req, res) =>
     new RestaurantHandler(db.restaurants).processGetRequest(req, res));
router.post('/:place_id/like', (req, res) =>
     new RestaurantHandler(db.restaurants).processLikeRequest(req, res));
router.post('/:place_id/dislike', (req, res) =>
    new RestaurantHandler(db.restaurants).processDislikeRequest(req, res));

module.exports = router;
