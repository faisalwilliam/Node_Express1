const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const MyData = require('./views/models/mydataSchema')
// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.use(express.static("public"));

// Auto Refresh the browser on file changes (for development purposes)
 /*
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
 
 
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());
 
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
*/

// Route to handle the home page





// Serve static files from the "views" directory
app.get('/', (req, res) => {



    // Retrieve data from MongoDB
    MyData.find().then((result) => {

        // Render the "home" template and pass the title variable
        res.render("home", { mytile: "Home Page", arr: result });

    }).catch((error) => {
        console.error('Error retrieving data from MongoDB:', error);
    });



})

// Route to handle /index.html
app.get('/index.html', (req, res) => {

    res.send("<h1>Data send successfully</h1>")
})



// Connect to MongoDB


    // Start the server after successful database connection
    .then(() => {
        app.listen(port, () => {
            console.log(`http://localhost:${port}`)
        })
    })
    // Handle connection errors
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error)
    })
// Handling form submission
app.post('/', (req, res) => {
    console.log(req.body)

    // Save the data to MongoDB
    const mydata = new MyData(req.body)
    mydata.save().then(() => {

        // Redirect to /index.html after successful save
        res.redirect("/index.html")
    }).catch((error) => {
        console.error('Error saving data to MongoDB:', error)
        res.status(500).send('Internal Server Error')
    })

})

