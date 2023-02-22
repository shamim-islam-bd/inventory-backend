const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const orderRoute = require("./routes/orderRoute");
const contactRoute = require("./routes/contactRoute");
const errorHandler = require("./middleWare/errorMiddleware");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();  

// Connect to DB and start server....
const PORT = process.env.PORT; 

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cors());

app.use(
  cors({
    // origin: ["http://localhost:3000", "https://pinvent-app.vercel.app"],
    origin: ["http://localhost:3000", "http://localhost:8000"],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Access-Control-Allow-Headers', 'Access-Control-Allow-Origin', 'Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
  })
);


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
     next();
});

// app.use((req, res, next) => {
//   res.header({"Access-Control-Allow-Origin": "*"});
//   next();
// }) 

// Routes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes Middleware
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/contactus", contactRoute);

// Routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

// Error Middleware..
app.use(errorHandler);



// here database connection is established & server is started.
mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection Succesful");
      console.log(`Server Running on port ${PORT}`);
    });
  })
  .catch((err)=>{
    console.log({
    message: err.message,
    stack: err.stack
    })
  })
