import express = require('express');
import {UserLoginHandler} from "../handlers/UserLoginHandler";
const router = express.Router();
let db = require('../models').userlogins;

router.post('/', (req, res) =>
    new UserLoginHandler(db).process(req, res));

module.exports = router;
