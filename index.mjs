import express from 'express';
import mysql from 'mysql2/promise';

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

//for Express to get values using POST method
app.use(express.urlencoded({extended:true}));

//setting up database connection pool
const pool = mysql.createPool({
    host: "g8mh6ge01lu2z3n1.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "vf3eq84lslno4wi3",
    password: "fahim1jmq6mmb4nf",
    database: "ypx5nnap969d2ue6",
    connectionLimit: 10,
    waitForConnections: true
});

//routes
app.get('/', async (req, res) => {
    let sql = `SELECT authorId, firstName, lastName
    FROM authors
    ORDER BY lastName`;
    const [rows] = await pool.query(sql);
    console.log(rows);

    let sql2 = `SELECT DISTINCT category
    FROM quotes`;
    const [rows2] = await pool.query(sql2);
    console.log(rows2);

   res.render("home.ejs", {rows, rows2});
});

app.get('/searchByCategory', async (req, res) => {
    let category = req.query.category;
    let sql = `SELECT authorId,firstName, lastName, quote, category
               FROM quotes
               NATURAL JOIN authors
               WHERE category = ?`;
    let sqlParams = [`${category}`];
    const [rows] = await pool.query(sql, sqlParams);
    console.log(rows);
   res.render("results.ejs", {rows});
});

app.get('/searchByKeyword', async (req, res) => {
    let keyword = req.query.keyword;
    let sql = `SELECT authorId,firstName, lastName, quote
               FROM authors
               NATURAL JOIN quotes
               WHERE quote LIKE ?`;
    let sqlParams = [`%${keyword}%`];
    const [rows] = await pool.query(sql, sqlParams);
    console.log(rows);
   res.render("results.ejs", {rows});
});

app.get('/searchByAuthor', async (req, res) => {
    let authorId = req.query.authorId;
    console.log(authorId);
    let sql = `SELECT authorId, firstName, lastName, quote
               FROM authors
               NATURAL JOIN quotes
               WHERE authorId = ?`;
    let sqlParams = [`${authorId}`];
    const [rows] = await pool.query(sql, sqlParams);
    console.log(rows);
   res.render("results.ejs", {rows});
});

// local api to get all info for a specific author
app.get('/api/authors/:authorId', async (req, res) => {
    let authorId = req.params.authorId;
    let sql = `SELECT *
                FROM authors
                WHERE authorID = ?`;
    const [rows] = await pool.query(sql, authorId);
    res.send(rows);
});

app.get("/dbTest", async(req, res) => {
   try {
        const [rows] = await pool.query("SELECT CURDATE()");
        res.send(rows);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send("Database error!");
    }
});//dbTest

app.listen(3000, ()=>{
    console.log("Express server running")
})