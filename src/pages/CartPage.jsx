// src/pages/CartPage.jsx
import React from 'react';
import ShoppingCart from '../components/ShoppingCart';
import CartSummary from '../components/CartSummary';

function CartPage({ 
    cart, totals, updateQuantity, removeFromCart, 
    discountCode, setDiscountCode, handleApplyDiscount, formatCurrency 
}) {
  return (
    <div className="cart-page-content">
      {/* Giỏ hàng chiếm 60% */}
      <div className="cart-details-column">
        <ShoppingCart 
          cart={cart}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          formatCurrency={formatCurrency}
        />
      </div>
      
      {/* Thanh toán chiếm 40% */}
      <div className="cart-summary-column">
        <CartSummary 
          totals={totals}
          discountCode={discountCode}
          setDiscountCode={setDiscountCode}
          handleApplyDiscount={handleApplyDiscount}
          formatCurrency={formatCurrency}
          // Không cần currency/setCurrency nếu không nâng cấp
        />
      </div>
    </div>
  );
}

export default CartPage;