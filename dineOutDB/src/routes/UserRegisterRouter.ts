import express = require('express');
import {UserRegisterHandler} from "../handlers/UserRegisterHandler";
const router = express.Router();
const db = require('../models');

router.post('/', (req, res) =>
    new UserRegisterHandler(db.userlogins).process(req, res));

module.exports = router;
