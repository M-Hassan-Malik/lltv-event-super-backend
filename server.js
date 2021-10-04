const express = require("express");
require("path");
const app = express();
var cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const originURL = [`http://localhost:3000`, `https://lltv-event-super.netlify.app`];
app.use(
  cors({
    origin: originURL,
    credentials: true,
  })
);

app.use(express.static(__dirname + "/public/uploads"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/events/", require("./api/events"));
app.use("/api/attendees/", require("./api/attendees"));
app.use("/api/organizers/", require("./api/organizers"));
app.use("/api/logging/", require("./api/loggings"));
app.use("/api/blogs/", require("./api/blogs"));

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on ${originURL[0]} and ${originURL[1]}`);
});
