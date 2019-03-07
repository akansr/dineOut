import {GetRestaurantsHandler} from "./GetRestaurantsHandler";
import {GetRestaurantNameHandler} from "./GetRestaurantNameHandler";

import express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    return new GetRestaurantsHandler().process(req, res);
});

router.get('/:place_id/name', (req, res) => {
    return new GetRestaurantNameHandler().process(req, res);
});

module.exports = router;
