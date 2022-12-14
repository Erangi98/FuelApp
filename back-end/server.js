const express = require("express");
const dotenv = require("dotenv");
const connectDataBase = require("./Configuration/database");
const ownerRoute = require("./Routes/ownerRoute");
const userRoute = require("./Routes/userRoute");
const queueLengthRoute = require("./Routes/queueRoutes");
const stationRoute = require("./Routes/stationRoute")
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
app.use("/api/queueLength", queueLengthRoute);
app.use("/api/stations", stationRoute);

app.use(notFoundError);
app.use(errorHandler);

//port number
const PORT = process.env.PORT || 5000;

app.listen(5000, console.log(`Server started on port ${PORT}`));
