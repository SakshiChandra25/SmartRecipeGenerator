import React, { useState } from 'react';
const handleSearch = async () => {
const res = await axios.get(`${baseURL}/recipes?query=${query}`);


setRecipes(res.data);
};


return (
<div className="container d-flex flex-column align-items-center justify-content-center vh-100">
<div className="card p-4 w-50 shadow-lg">
<h3 className="text-center mb-3">Smart Recipe Generator</h3>
<input
type="text"
placeholder="Tell us what you wanna cook"
className="form-control mb-3"
value={query}
onChange={(e) => setQuery(e.target.value)}
/>
<button className="btn btn-primary w-100" onClick={handleSearch}>Search Recipe</button>
</div>


{recipes.length > 0 && (
<div className="mt-5 w-75">
{recipes.map((r) => (
<div key={r.id} className="card p-3 mb-3 shadow-sm">
<h5>{r.title}</h5>
<p><b>Ingredients:</b> {r.ingredients.join(', ')}</p>
<p><b>Steps to Follow:</b> {r.instructions}</p>
</div>
))}
</div>
)}
</div>
);
};


export default App;