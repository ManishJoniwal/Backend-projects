const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/db");

//dot en configuration
dotenv.config();
//DB connection
connectDb();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


// routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/product", require("./routes/productRoute"));
app.use("/api/gallery", require("./routes/galleryRoute"));
app.use("/api/order", require("./routes/orderRoute"));
app.use("/api/gallery", require("./routes/galleryRoute"));
app.use("/api/contact", require("./routes/contactRoute"));

//PORT  
const PORT = process.env.PORT || 8080;
//listen
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

