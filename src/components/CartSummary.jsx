// src/components/CartSummary.jsx
import React from 'react';

function CartSummary({ totals, discountCode, setDiscountCode, handleApplyDiscount, formatCurrency }) {
  return (
    <div className="cart-summary">
      <h3>Thanh Toán</h3>
      <div className="summary-line">
        <span>Tạm tính (chưa thuế):</span>
        <span>{formatCurrency(totals.subTotal)}</span>
      </div>
      <div className="summary-line">
        <span>Thuế (VAT/Phí):</span>
        <span>{formatCurrency(totals.totalTax)}</span>
      </div>
      
      <div className="discount-area">
        <input 
          type="text"
          placeholder="Nhập mã giảm giá (GIAM20)"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
        />
        <button onClick={handleApplyDiscount}>Áp Dụng</button>
      </div>
      
      {totals.discount > 0 && (
        <div className="summary-line discount-line">
          <span>Mã giảm giá đã áp dụng:</span>
          <span>- {formatCurrency(totals.discount)}</span>
        </div>
      )}
      
      <div className="summary-line">
        <span>Phí Vận chuyển:</span>
        <span>{formatCurrency(totals.shippingFee)}</span>
      </div>
      
      <hr />
      
      <div className="summary-line total-line">
        <span>Tổng cộng:</span>
        <span>{formatCurrency(totals.finalTotal)}</span>
      </div>
      
      <button className="checkout-btn">TIẾN HÀNH THANH TOÁN</button>
    </div>
  );
}

export default CartSummary;