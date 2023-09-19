const Tickers = require("../models/Tickers")
require('dotenv').config();


exports.fetchTickers = async (req, res) => {
    try {
        const response = await Tickers.find()

        res.status(200).json({
            success: true,
            data: response,
            message: "Tickers fetched successfully",
          })
    } catch (error) {
        res.status(500).json({
            success: false,
            error:error.message,
            message: "Tickers cannot be fetched",
        })
    }
}

