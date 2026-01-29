const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const methodOverride = require('method-override')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))
const MyData = require('./models/mydataSchema')
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
app.get('/', (req, res) => {
    MyData.find()
        .then((result) => {
            res.render("index", { arr: result });
        })
        .catch((err) => {
            console.log(err);
        });
})

// Route to handle /index.html
app.get("/user/add.html", (req, res) => {

    res.render("user/add", {});
})
// Route to handle /index.html
app.get("/user/view/:id", (req, res) => {
    MyData.findById(req.params.id)
        .then((result) => {
            res.render("user/view", { obj: result });
        })
        .catch((err) => {
            console.log(err);
        });
})
// Route to handle /index.html
app.get("/user/edit/:id", (req, res) => {
    MyData.findById(req.params.id)
        .then((result) => {
            res.render("user/edit", { obj: result });
        })
        .catch((err) => {
            console.log(err);
        });
})
app.put("/user/edit/:id", (req, res) => {
    MyData.findByIdAndUpdate(req.params.id, req.body)
        .then(() => {
            res.redirect("/");
        })
        .catch((err) => {
            console.log(err);
        });
});

// Route to handle delete
app.delete("/user/:id", (req, res) => {
    MyData.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect("/");
        })
        .catch((err) => {
            console.log(err);
        });
});

// Connect to MongoDB
mongoose.connect("mongodb+srv://williamfaisal")

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
        res.redirect("/")
    }).catch((error) => {
        console.error('Error saving data to MongoDB:', error)
        res.status(500).send('Internal Server Error')
    })

})
