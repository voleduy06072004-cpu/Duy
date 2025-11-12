// src/components/ShoppingCart.jsx
import React from 'react';
import CartItem from './CartItem';

function ShoppingCart({ cart, updateQuantity, removeFromCart, formatCurrency }) {
  return (
    <div className="cart-container">
      <h2>Giỏ Hàng Của Bạn ({cart.length} sản phẩm)</h2>
      {cart.length === 0 ? (
        <p className="empty-cart">Giỏ hàng đang trống. Hãy chọn một chiếc Zippo!</p>
      ) : (
        <div className="cart-items-list">
          {cart.map(item => (
            <CartItem 
              key={item.id} 
              item={item} 
              updateQuantity={updateQuantity} 
              removeFromCart={removeFromCart}
              formatCurrency={formatCurrency}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;