const express = require('express');
const router = express.Router();
const db = require('../db');


async function findRecipesByIngredients(ingredients, dietary) {
// ingredients: array of lowercase ingredient names
// Very simple scoring: count matching ingredients
    const placeholders = ingredients.map(() => '?').join(',');


// get all recipes with their ingredients
const [recipes] = await db.query(`
    SELECT r.id, r.title, r.instructions, r.calories, r.protein, r.difficulty, r.cook_time, r.dietary
    FROM recipes r
`);


const results = [];
for (const r of recipes) {
if (dietary && dietary !== 'any' && r.dietary !== dietary) continue;
const [rows] = await db.query(
`SELECT i.name FROM recipe_ingredients ri JOIN ingredients i ON ri.ingredient_id = i.id WHERE ri.recipe_id = ?`,
[r.id]
);
const ingr = rows.map(x => x.name.toLowerCase());
let matchCount = 0;
for (const q of ingredients) if (ingr.includes(q)) matchCount++;
// score: proportion of recipe ingredients matched
const score = matchCount / Math.max(1, ingr.length);
results.push({ ...r, ingredients: ingr, matchCount, score });
}
// sort by score desc then matchCount desc
results.sort((a, b) => b.score - a.score || b.matchCount - a.matchCount);
return results;
}


// POST /api/recipes/generate
router.post('/generate', async (req, res) => {
try {
const { ingredients = [], dietary = 'any', maxResults = 10 } = req.body;
const normalized = (ingredients || []).map(i => String(i).trim().toLowerCase()).filter(Boolean);
if (normalized.length === 0) return res.status(400).json({ error: 'No ingredients provided' });


const results = await findRecipesByIngredients(normalized, dietary);
return res.json({ recipes: results.slice(0, maxResults) });
} catch (err) {
console.error(err);
return res.status(500).json({ error: 'Server error' });
}
});
// GET /api/recipes
router.get('/', async (req, res) => {
try {
const [rows] = await db.query('SELECT id, title, difficulty, cook_time, calories, protein, dietary FROM recipes');
res.json({ recipes: rows });
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Server error' });
}
});
// GET /api/recipes/:id
router.get('/:id', async (req, res) => {
try {
const id = req.params.id;
const [[recipe]] = await db.query('SELECT * FROM recipes WHERE id = ?', [id]);
if (!recipe) return res.status(404).json({ error: 'Not found' });
const [ings] = await db.query(
'SELECT i.name FROM recipe_ingredients ri JOIN ingredients i ON ri.ingredient_id = i.id WHERE ri.recipe_id = ?',
[id]
);
recipe.ingredients = ings.map(i => i.name);
res.json({ recipe });
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Server error' });
}
});




module.exports = router;
