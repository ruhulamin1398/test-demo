const express = require("express");
const cors = require("cors");
const helmet = require("helmet"); 
const compression = require("compression");
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const app = express();

// Mongoose configuration
mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log(process.env.MONGO_URL)
    console.log("Connected to MongoDB");

    app.use(helmet());

    //to show logs
    app.use(morgan('tiny'));

    const apiLimiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 300 
      });

    app.use('/*', apiLimiter);

    const corsOptions = {
    origin:  "*",
    methods: ['GET', 'POST'],
    optionsSuccessStatus: 200,
    credentials: true
    };

    app.use(cors(corsOptions));

    app.use(compression());

    app.use(express.json({ limit: "500mb" }));
    app.use(express.urlencoded({ limit: "500mb", extended: true }));

    // Root route
    app.get("/", (req, res) => {
      res.send('Welcome to Lottaverse API');
    });

    // Import and use routes
    require('./routes/index.js')(app);
    require('./middlewares/cronJobs.js');

    // Error handling middleware
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Something went wrong!');
    });

    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  });
// Export the app for serverless function
module.exports = app;
