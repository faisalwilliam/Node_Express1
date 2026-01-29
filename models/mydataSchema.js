const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for MyData
const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    age: Number,
    country: String,
    gender: String,
}, { timestamps: true });

// Create the model from the schema
const MyData = mongoose.model('MyData', userSchema);
// Export the model to use it in other parts of the application
module.exports = MyData;