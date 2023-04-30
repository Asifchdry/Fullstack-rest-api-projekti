var express = require("express");
var app = express();

// Tämä tarvitaan datan lukemiseen
app.use(express.json());
app.use(express.urlencoded({extended: false}));


let movies = [
    {
        id:"1",
        title: "Inception",
        director: "Christopher Nolan",
        release_date: "2010-07-16",
    },
    {
        id:"2",
        title:"The Irishman",
        director:"Martin Scorcese",
        release_date:"2019-09-27",
    },
];


// Tulostetaan kaikki leffat
app.get("/api/getall", (req, res) => {
    res.json(movies)
});


// lisää elokuva
app.post("/api/add", (req,res) => {
    const movie = req.body;
    console.log(movie);
    leffat.push(movie);
    res.send("Elokuva lisätään leffojen listaan!");
});

// Hae elokuva id numeron avulla
app.get("/api/:id", (req, res) => {
    const id = req.params.id;

    for (let movie of movies) {
        if(movie.id === id) {
            res.json(movie)
            return
        }
    }

    res.status(404).send("Movie not found")
});

// poista elokuva listasta (movies)
app.delete("/api/:id", (req, res) => {
    const id = req.params.id;

    movies = movies.filter((movie) => {
        if (movie.id !== id) {
            return true;
        }
        return false;
    });

    res.send("Movie deleted");
});


// Web-palvelimen luonti Expressin avulla
app.listen(8081, function() {
  console.log("Kuunnellaan porttia 8081!");
});
