const API_BASE = import.meta.env.VITE_API_BASE;

export async function generateRecipes(ingredients: string[], dietary = 'any') {
    const res = await fetch(`${API_BASE}/api/recipes/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ingredients, dietary })
    });
    if (!res.ok) throw new Error('Failed to generate');
    return res.json();
}
export async function listRecipes() {
    const res = await fetch(`${API_BASE}/api/recipes`);
    return res.json();
}
export async function getRecipe(id: number) {
    const res = await fetch(`${API_BASE}/api/recipes/${id}`);
    return res.json();
}
