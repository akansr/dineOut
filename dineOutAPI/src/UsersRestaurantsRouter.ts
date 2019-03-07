import {GetUsersRestaurantsHandler} from "./GetUsersRestaurantsHandler";

const express = require('express');
const router = express.Router();

router.get('/:user_id/restaurants', async (req, res) =>
    await new GetUsersRestaurantsHandler().process(req, res));

module.exports = router;

