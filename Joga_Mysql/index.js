const express = require("express");
const path = require("path");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();

const hbs = require("express-handlebars");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.engine("hbs", hbs.engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts/"
}));

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "qwerty",
    database: "joga_mysql"
});

con.connect((err) => {
    if (err) throw err;
    console.log("Connected to joga_mysql db");
});

// Artiklite loendi päring
app.get("/", (req, res) => {
    let query = "SELECT * FROM article";
    con.query(query, (err, result) => {
        if (err) throw err;
        res.render("index", {
            articles: result
        });
    });
});

// Üksiku artikli ja autori päring
app.get("/article/:slug", (req, res) => {
    let query = `SELECT article.*, author.name AS author_name 
                 FROM article 
                 JOIN author ON article.author_id = author.id 
                 WHERE article.slug = "${req.params.slug}"`;

    con.query(query, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            const article = result[0];
            res.render("article", {
                article: article,
                author_name: article.author_name // Edastame autori nime mallile
            });
        } else {
            res.status(404).send("Article not found");
        }
    });
});

// Üksiku autori postituste päring
app.get("/author/:id", (req, res) => {
    const authorId = req.params.id;

    // Esiteks pärime autori nime
    let authorQuery = `SELECT name FROM author WHERE id = ${authorId}`;
    
    // Teiseks pärime artiklid sellelt autorilt
    let articlesQuery = `SELECT * FROM article WHERE author_id = ${authorId}`;

    // Esimene päring: autori andmete pärimine
    con.query(authorQuery, (err, authorResult) => {
        if (err) throw err;

        if (authorResult.length > 0) {
            const authorName = authorResult[0].name;

            // Teine päring: artiklite pärimine
            con.query(articlesQuery, (err, articlesResult) => {
                if (err) throw err;

                // Kui autori artiklid on olemas
                if (articlesResult.length > 0) {
                    res.render("index", {
                        articles: articlesResult, // Artiklid, mida renderdame esilehe malliga
                        author_name: authorName,  // Autori nimi, mida kuvame mallis
                        author_page: true         // Märgistus, et oleme autori lehel
                    });
                } else {
                    res.render("index", {
                        articles: [], // Tühi loend, kui artikleid pole
                        author_name: authorName,
                        author_page: true
                    });
                }
            });

        } else {
            res.status(404).send("Author not found");
        }
    });
});

app.listen(3003, () => {
    console.log("App is started at http://localhost:3003");
});
