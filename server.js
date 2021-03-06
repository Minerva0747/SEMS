const express = require("express")
const bodyParser = require("body-parser")
const user = require("./routes/user");
const event = require("./routes/event");
const InitiateMongoServer = require("./config/db");
const cookieParser = require('cookie-parser');




const multer = require("multer");



InitiateMongoServer();



const app = express()
const expressLayouts = require('express-ejs-layouts')

app.use(cookieParser());

app.use(function(req, res, next) {  
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
res.header('Access-Control-Allow-Credentials', true);
res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});  

app.use(bodyParser.urlencoded({limit : '10mb' , extended : false}));
app.use(bodyParser.json());


const indexRouter = require('./routes/index')
const signupRouter = require('./routes/signup')
const homeRouter = require('./routes/home')
const profileRouter = require('./routes/profile')
const participationRouter = require('./routes/participation')
const myeventRouter = require('./routes/myevent')
const attendanceRouter = require('./routes/attendance')
const volunteerRouter = require('./routes/volunteer')
const adminRouter = require('./routes/admin')

app.set('view engine', 'ejs')
app.set('views',__dirname + '/views')
app.set('layout', 'layouts/layout')



app.use(expressLayouts)
app.use(express.static('public'))
app.use('/', indexRouter)
app.use('/signup', signupRouter)
app.use('/home', homeRouter)
app.use('/profile', profileRouter)
app.use('/public', express.static('public'))
app.use('/participation', participationRouter)
app.use('/attendance',attendanceRouter)
app.use('/myevent', myeventRouter)
app.use('/volunteer', volunteerRouter)
app.use('/admin', adminRouter)

app.use(express.static(__dirname + '/public'));

const PORT = process.env.PORT || 3000;


app.get("/", (req, res) => {
    res.json({ message: "API Working" });
  });

  app.use("/user", user);
  app.use("/event", event);
  



  app.listen(PORT, (req, res) => {
    console.log(`Server Started at PORT ${PORT}`);
  });
































