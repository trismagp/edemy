import express from "express";
import cors from "cors";
import { readdirSync } from "fs";
import mongoose from "mongoose";
const morgan = require("morgan");
require("dotenv").config();

// create express app
const app = express();


mongoose
    .connect('mongodb://127.0.0.1:27017/edemy')
    .then(() => console.log("****db_connected"))
    .catch((err) => console.log('error-----', err));

// apply middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// route
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));


// port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
