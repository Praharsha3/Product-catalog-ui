import './ProductCatalog.css';

import React, { useState, useEffect } from "react";

const mockProducts = [ { id: 1, name: "iPhone 14", category: "Electronics", brand: "Apple", price: 799, rating: 4.7, popularity: 3000 }, { id: 2, name: "Galaxy S22", category: "Electronics", brand: "Samsung", price: 699, rating: 4.5, popularity: 2500 }, { id: 3, name: "MacBook Pro", category: "Electronics", brand: "Apple", price: 1299, rating: 4.8, popularity: 1800 }, { id: 4, name: "T-Shirt", category: "Clothing", brand: "Nike", price: 29, rating: 4.2, popularity: 700 }, { id: 5, name: "Running Shoes", category: "Clothing", brand: "Adidas", price: 99, rating: 4.6, popularity: 1200 }, { id: 6, name: "OLED TV", category: "Electronics", brand: "LG", price: 1199, rating: 4.4, popularity: 900 }, { id: 7, name: "Jeans", category: "Clothing", brand: "Levi's", price: 49, rating: 4.3, popularity: 1000 } ];

const ProductCatalog = () => { const [products, setProducts] = useState([]); const [filteredProducts, setFilteredProducts] = useState([]);

const [category, setCategory] = useState(""); const [brands, setBrands] = useState([]); const [minPrice, setMinPrice] = useState(""); const [maxPrice, setMaxPrice] = useState(""); const [sortBy, setSortBy] = useState("");

useEffect(() => { setProducts(mockProducts); setFilteredProducts(mockProducts); }, []);

useEffect(() => { filterProducts(); }, [category, brands, minPrice, maxPrice, sortBy]);

const filterProducts = () => { let result = [...products];

if (category) {
  result = result.filter(p => p.category === category);
}

if (brands.length > 0) {
  result = result.filter(p => brands.includes(p.brand));
}

if (minPrice !== "") {
  result = result.filter(p => p.price >= parseFloat(minPrice));
}

if (maxPrice !== "") {
  result = result.filter(p => p.price <= parseFloat(maxPrice));
}

if (sortBy === "priceLowHigh") {
  result.sort((a, b) => a.price - b.price);
} else if (sortBy === "priceHighLow") {
  result.sort((a, b) => b.price - a.price);
} else if (sortBy === "rating") {
  result.sort((a, b) => b.rating - a.rating);
} else if (sortBy === "popularity") {
  result.sort((a, b) => b.popularity - a.popularity);
}

setFilteredProducts(result);

};

const handleBrandChange = (e) => { const brand = e.target.value; if (e.target.checked) { setBrands([...brands, brand]); } else { setBrands(brands.filter(b => b !== brand)); } };

const resetFilters = () => { setCategory(""); setBrands([]); setMinPrice(""); setMaxPrice(""); setSortBy(""); setFilteredProducts(products); };

const uniqueCategories = [...new Set(products.map(p => p.category))]; const uniqueBrands = [...new Set(products.map(p => p.brand))];

return ( <div className="p-6"> <h1 className="text-2xl font-bold mb-4">Product Catalog</h1>

<div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
    {/* Category Filter */}
    <div>
      <label className="block font-semibold mb-1">Category</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border">
        <option value="">All Categories</option>
        {uniqueCategories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>

    {/* Brand Filter */}
    <div>
      <label className="block font-semibold mb-1">Brands</label>
      {uniqueBrands.map(brand => (
        <div key={brand}>
          <input
            type="checkbox"
            value={brand}
            checked={brands.includes(brand)}
            onChange={handleBrandChange}
          /> {brand}
        </div>
      ))}
    </div>

    {/* Price Filter */}
    <div>
      <label className="block font-semibold mb-1">Min Price</label>
      <input
        type="number"
        className="w-full p-2 border mb-2"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />
      <label className="block font-semibold mb-1">Max Price</label>
      <input
        type="number"
        className="w-full p-2 border"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
    </div>

    {/* Sort By */}
    <div>
      <label className="block font-semibold mb-1">Sort By</label>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full p-2 border">
        <option value="">None</option>
        <option value="priceLowHigh">Price: Low to High</option>
        <option value="priceHighLow">Price: High to Low</option>
        <option value="rating">Rating</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>

    {/* Reset Button */}
    <div className="flex items-end">
      <button
        onClick={resetFilters}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Reset Filters
      </button>
    </div>
  </div>

  {/* Product List */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {filteredProducts.map(product => (
      <div key={product.id} className="border p-4 rounded shadow">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p>Category: {product.category}</p>
        <p>Brand: {product.brand}</p>
        <p>Price: ₹{product.price}</p>
        <p>Rating: ⭐ {product.rating}</p>
        <p>Popularity: 🔥 {product.popularity}</p>
      </div>
    ))}
    {filteredProducts.length === 0 && <p>No products found.</p>}
  </div>
</div>

); };

export default ProductCatalog;