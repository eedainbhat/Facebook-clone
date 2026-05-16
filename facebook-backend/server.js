const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./src/db/db');
const app = require('./src/app');
const PORT = process.env.PORT || 3005;


connectDB();

app.listen(PORT, () => {
    console.log(`Server running on PORT:${PORT}. Click here to visit http://localhost:${PORT}`);
});