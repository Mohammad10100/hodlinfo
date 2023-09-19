const express = require("express")

const router = express.Router();

// mapping the controllers for posts in the routes 
const {fetchTickers} = require('../controller/tickers');

router.get("/fetch", fetchTickers)

module.exports = router;