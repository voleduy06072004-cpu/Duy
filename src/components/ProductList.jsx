// src/components/ProductList.jsx
import React from 'react';
import ProductItem from './ProductItem';

function ProductList({ products, addToCart, formatCurrency }) {
  // Hiển thị sản phẩm theo danh mục
  const categories = [...new Set(products.map(p => p.category))];

  return (
    <div className="product-list-container">
      {categories.map(category => (
        <div key={category} className="category-group">
          <h3>{category}</h3>
          <div className="product-grid">
            {products
              .filter(p => p.category === category)
              .map(product => (
                <ProductItem 
                  key={product.id} 
                  product={product} 
                  addToCart={addToCart} 
                  formatCurrency={formatCurrency}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;