// src/components/CartItem.jsx
import React from 'react';

function CartItem({ item, updateQuantity, removeFromCart, formatCurrency }) {
  const itemTotal = item.price * item.quantity;
  
  const handleQuantityChange = (e) => {
    // Điều chỉnh số lượng sản phẩm
    updateQuantity(item.id, e.target.value);
  };

  return (
    <div className="cart-item">
      <div className="item-details">
        <h4>{item.name}</h4>
        <p>Đơn giá: {formatCurrency(item.price)}</p>
      </div>
      <div className="item-controls">
        <input 
          type="number" 
          min="1" 
          value={item.quantity} 
          onChange={handleQuantityChange} 
          className="quantity-input"
        />
        <p className="item-total">
          {formatCurrency(itemTotal)}
        </p>
        <button 
          onClick={() => removeFromCart(item.id)}
          className="remove-btn"
        >
          Xóa
        </button>
      </div>
    </div>
  );
}

export default CartItem;