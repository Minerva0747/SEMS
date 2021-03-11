const mongoose = require("mongoose");

//link to the database
const MONGOURI = "mongodb+srv://1171303197:Rasulallah97_@cluster0.cogzp.mongodb.net/<dbname>?retryWrites=true&w=majority"

const InitiateMongoServer = async () => 
{
  try 
  {
    await mongoose.connect(MONGOURI, { useNewUrlParser: true, useFindAndModify: false,  useUnifiedTopology: true });
    console.log("Connected to database");
  } 
  catch (e) 
  {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;