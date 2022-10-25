const express = require("express");
const dotenv = require("dotenv");
const connectDataBase = require("./Configuration/database");
const ownerRoute = require("./Routes/ownerRoute");
const userRoute = require("./Routes/userRoute");
const stationRoute = require("./Routes/stationRoute");
const { notFoundError, errorHandler } = require("./Middlewares/errorMiddleWare");

const app = express();
dotenv.config();
connectDataBase();
app.use(express.json());

app.use("/api/owners", ownerRoute);
app.use("/api/users", userRoute);
app.use("/api/stations", stationRoute);

app.use(notFoundError);
app.use(errorHandler);

/*app.get('/',(req,res)=>{
    res.send("API is running..");
});*/

const PORT = process.env.PORT || 5000;

app.listen(5000, console.log(`Server started on port ${PORT}`));
