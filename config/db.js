const mongoose = require("mongoose");

const MONGOURI = "mongodb+srv://1171303225:Amirul_027@@@cluster0.cogzp.mongodb.net/<dbname>?retryWrites=true&w=majority"

const InitiateMongoServer = async () => {
    try {
      await mongoose.connect(MONGOURI, {
        useNewUrlParser: true, useFindAndModify: false,  useUnifiedTopology: true
      });
      console.log("Connected to DB !!");
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  module.exports = InitiateMongoServer;