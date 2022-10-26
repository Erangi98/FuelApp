const express = require("express");
const dotenv = require("dotenv");
const connectDataBase = require("./Configuration/database");
const ownerRoute = require("./Routes/ownerRoute");
const userRoute = require("./Routes/userRoute");
const stationRoute = require("./Routes/stationRoute");
const fuelArrivalRoute = require("./Routes/fuelArrivalRoute");
const fuelDepartureRoute = require("./Routes/fuelDepartureRoute");
const queueLengthRoute = require("./Routes/queueRoutes");
const {
  notFoundError,
  errorHandler,
} = require("./Middlewares/errorMiddleWare");

const app = express();
dotenv.config();
connectDataBase();
app.use(express.json());

//route prefixes
app.use("/api/owners", ownerRoute);
app.use("/api/users", userRoute);
app.use("/api/stations", stationRoute);
app.use("/api/fuelArrival", fuelArrivalRoute);
app.use("/api/fuelDeparture", fuelDepartureRoute);
app.use("/api/queueLength", queueLengthRoute);

app.use(notFoundError);
app.use(errorHandler);

//port number
const PORT = process.env.PORT || 5000;

app.listen(5000, console.log(`Server started on port ${PORT}`));
