require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const authRouter = require("./routes/auth");
const categoryRouter = require("./routes/category");
const sizeRouter = require("./routes/size");
const colorRouter = require("./routes/color");
const classifyRouter = require("./routes/classify");
const imageRouter = require("./routes/image");
const productRouter = require("./routes/product");

mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://quanganhdev:fedev2k123@fashion-shop.laqlqmd.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
      }
    );

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/category", categoryRouter);
app.use("/api/size", sizeRouter);
app.use("/api/color", colorRouter);
app.use("/api/classify", classifyRouter);
app.use("/api/image", imageRouter);
app.use("/api/product", productRouter);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
