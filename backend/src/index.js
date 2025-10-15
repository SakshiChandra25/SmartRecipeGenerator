const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');


const app = express();
app.use(cors());
app.use(bodyParser.json());


const db = mysql.createConnection({
host: process.env.DB_HOST,
user: process.env.DB_USER,
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME,
});


app.get('/recipes', (req, res) => {
const { query } = req.query;
const sql = `SELECT * FROM recipes WHERE title LIKE ?`;
db.query(sql, [`%${query}%`], (err, results) => {
if (err) return res.status(500).send(err);
if (results.length === 0) return res.json([]);


const recipeIds = results.map(r => r.id);
const ingSql = `SELECT r.id AS recipe_id, i.name AS ingredient_name FROM recipe_ingredients ri JOIN ingredients i ON ri.ingredient_id = i.id JOIN recipes r ON ri.recipe_id = r.id WHERE r.id IN (?)`;


db.query(ingSql, [recipeIds], (err2, ingResults) => {
if (err2) return res.status(500).send(err2);
const final = results.map(r => ({
id: r.id,
title: r.title,
instructions: r.instructions,
ingredients: ingResults.filter(i => i.recipe_id === r.id).map(i => i.ingredient_name)
}));
res.json(final);
});
});
});



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
