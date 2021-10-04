const mongoose = require("mongoose");

//  "mongodb+srv://admin:<password>@cluster0.9oejs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
//  "mongodb://localhost:27017/sales"

mongoose
  .connect(
    "mongodb+srv://eventdb:pass1234@cluster0.bd5or.mongodb.net/eventdb",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .catch((error) => console.log("Error connecting to MongoDB @Model:", String(error)));

module.exports = {
  Event: require("./Event"),
  Registration: require("./Registration"),
  Blog: require("./Blog"),
  Ticket: require("./Ticket"),
};
