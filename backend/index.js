require('dotenv').config();
const express = require("express");
var cors = require('cors')
const axios = require('axios');
const app = express();
const Tickers = require('./models/Tickers')
const PORT = process.env.PORT || 4001;
const API_URL = process.env.API_URL
app.use(express.json())
const dbConnect = require('./config/database')
dbConnect();



// function to fetch top 10 results 
const fetch10Tickers = async () => {
    try {

        // since it is not mentioned when to fetch the top 10 results
        // i am assuming that we have to fetch it only one time when the server starts
        // to not repetedly save the result in db, i am checking if it is already present in db 
        if ((await Tickers.find()).length == 0) {

            // fetching all the tickers 
            const response = await axios.get(API_URL);

            // slicing the top 10 tickers 
            const top10Tickers = Object.values(response.data).slice(0, 10)

            //storing it in database
            for (const iterator of top10Tickers) {
                const obj = Object.entries(iterator)

                // Create a new ticker object 
                const newTickerObj = {
                    name: obj[11][1],
                    last: obj[4][1],
                    buy: obj[9][1],
                    sell: obj[8][1],
                    volume: obj[7][1],
                    base_unit: obj[0][1]
                }

                // saving in db 
                const newTicker = await Tickers.create(newTickerObj)
                console.log('Top 10 tickers fetched succussfully');
            }
        }

        return true;
    } catch (error) {
        console.log('some error occured while fetching the top 10 tickers');
        return false;
    }
}
fetch10Tickers()




// accepting cross origin requests 
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 
}
app.use(cors(corsOptions))




//ROUTING
// import routes for TODO api 
const tickersRoute = require('./routes/Tickers')
// mount todo api routes 
app.use('/api/v1/tickers', tickersRoute)

app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: 'Your server is up and running....'
    });
})

app.listen(PORT, async () => {
    console.log(`server started successfully on port ${PORT}`)
})


