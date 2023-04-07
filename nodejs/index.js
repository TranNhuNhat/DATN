const  express =require("express");
const  mongoose =require("mongoose");
const  session =require("express-session");
const  bodyParser =require("body-parser");
const  cors =require("cors");




const app = express();
app.use(cors());
app.use(bodyParser.json({limit: '50gb'}));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({limit: '50gb', extended: true}));
// app.use(bodyParser.urlencoded({extended:false}));



//connection
mongoose.connect('mongodb://localhost:27017/QLHT',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", (error)=>console.log(error));
db.once("open", function () {
  console.log("Connected successfully");
});

app.get('/',(req,res)=> {
    res.send('hello world')
})

//import routes
const homestayRoutes = require("./routes/homestay");
const roomRoutes = require("./routes/room");
const roomtypeRoutes = require("./routes/roomtype");
const bookingRoutes = require("./routes/booking");
const adminRoutes = require("./routes/admin");


//middlewares
app.use(express.json());
app.use(express.static('uploads'));

//route Middlewares
app.use("/api/homestays",homestayRoutes);
app.use("/api/rooms",roomRoutes);
app.use("/api/roomtypes",roomtypeRoutes);
app.use("/api/bookings",bookingRoutes);
app.use("/api/admins",adminRoutes);


app.listen(3001,(req,res)=> {
    console.log('Server started at http://localhost:3001')
})