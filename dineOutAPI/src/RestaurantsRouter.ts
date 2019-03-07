import {restaurantsHandler} from "./RestaurantsHandler";

const express = require('express');
const router = express.Router();

// ?query=
router.get('/', async (req, res) =>
    await new restaurantsHandler().process(req, res));

module.exports = router;

