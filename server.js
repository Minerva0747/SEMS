const express = require("express")
const bodyParser = require("body-parser")
const user = require("./routes/user");
const event = require("./routes/event");
const InitiateMongoServer = require("./config/db");


InitiateMongoServer();

const app = express()
const expressLayouts = require('express-ejs-layouts')


const indexRouter = require('./routes/index')
const signupRouter = require('./routes/signup')
const homeRouter = require('./routes/home')
const profileRouter = require('./routes/profile')

app.set('view engine', 'ejs')
app.set('views',__dirname + '/views')
app.set('layout', 'layouts/layout')

app.use(expressLayouts)
app.use(express.static('public'))
app.use('/', indexRouter)
app.use('/signup', signupRouter)
<<<<<<< Updated upstream

=======
app.use('/home', homeRouter)
app.use('/profile', profileRouter)
>>>>>>> Stashed changes
app.use('/public', express.static('public'))

app.use(express.static(__dirname + '/public'));

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({limit : '10mb' , extended : false}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({ message: "API Working" });
  });

  app.use("/user", user);
  app.use("/event", event);
  



  app.listen(PORT, (req, res) => {
    console.log(`Server Started at PORT ${PORT}`);
  });




