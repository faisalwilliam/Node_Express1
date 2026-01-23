const mongoose = require('mongoose');

// Define the schema for MyData
const mydataSchema = new mongoose.Schema({
    Usernamee: String,
});

// Create the model from the schema
const MyData = mongoose.model('MyData', mydataSchema);
// Export the model to use it in other parts of the application
module.exports = MyData;