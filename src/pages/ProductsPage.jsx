// src/pages/ProductsPage.jsx
import React from 'react';
import ProductList from '../components/ProductList';

function ProductsPage({ products, addToCart, formatCurrency }) {
  return (
    <div className="products-page">
      <h2>Danh Sách Sản Phẩm Zippo</h2>
      <ProductList 
        products={products} 
        addToCart={addToCart} 
        formatCurrency={formatCurrency}
      />
    </div>
  );
}

export default ProductsPage;