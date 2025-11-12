import React from 'react';

function ProductItem({ product, addToCart, formatCurrency }) {
  return (
    <div className="product-card">
      <div className="product-image-container">
          <img 
              src={product.imageUrl}
              alt={product.name} 
              className="product-image"
              loading="lazy"
          />
      </div>
      
      <h4>{product.name}</h4>
      <p>Giá: <strong>{formatCurrency(product.price)}</strong></p>
      <p className="tax-info">Thuế/Phí: {(product.taxRate * 100).toFixed(0)}%</p>
      <button onClick={() => addToCart(product)}>
        Thêm vào Giỏ hàng
      </button>
    </div>
  );
}

export default ProductItem;