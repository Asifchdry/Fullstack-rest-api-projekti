var express = require("express");
var app = express();

require("dotenv").config();

var mongoose = require("mongoose");
var uri = process.env.DB_URI;


mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// Tämä tarvitaan lomakedatan lukemista varten

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const Movie = require("./modules/model");

const client = mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });


  // Tulostetaan kaikki leffat
  app.get("/api/leffat", function (req, res) {

    async function connect() {
        try {
            const leffat = await Movie.find({}).limit(10);
            console.log("Kaikki Leffat haettu");
            res.status(200).json(leffat);
        } catch (error) {
            res.status(500).json("Yhteysvirhe")
            console.error(`Connection error: ${error.stack} on Worker process: ${process.pid}`)
        } finally {
            console.log("Toimii");
        }
    }
    connect();
});

app.get("/api/hae/:id", function (req, res) {

        const filmbyid = Movie.findById(req.params.id);

        res.send(filmbyid);
        
});

app.get("/api/name/:text", (req, res) => {
    var nimi = req.params.text;


    res.send("Haetaan leffa nimen (title) perusteella")
    
});

app.post("/api/add", (req,res) => {
    const movie = req.body;
    console.log(leffat);
    leffat.push(Movie);
    res.send("Elokuva lisätään leffojen listaan!");
});

// poista elokuva listasta (movies)
app.delete("/api/:id", (req, res) => {
    const id2 = req.params.id;

    movies = Movie.filter((movie) => {
        if (movie.id !== id) {
            return true;
        }
        return false;
    });

    res.send("Elokuva poistetaan");
});


// Web-palvelimen luonti Expressin avulla
app.listen(1234, function() {
  console.log("Kuunnellaan porttia 1234!");
});