//External modules
const express = require("express");
const mongoose = require("mongoose");
 
//Local modules
const authRouter = require("./routes/auth.routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user.routes");
const path = require('path');
const rootDir = require("../utils/pathUtil");

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(rootDir, 'uploads')));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

module.exports = app;
