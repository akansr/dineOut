import {AnalyzerHandler} from "./AnalyzerHandler";

const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    new AnalyzerHandler().process(req, res)
});

module.exports = router;

