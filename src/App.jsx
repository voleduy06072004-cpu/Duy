// src/App.jsx (Chỉ dành cho Routing và State Management)
import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { initialProducts } from './data/products';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import './index.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Hàm định dạng tiền tệ (giữ nguyên)
const formatCurrency = (amount) => {
  return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

function App() {
  const SHIPPING_FEE = 30000;

  // State giỏ hàng, mã giảm giá và Logic Vẫn Ở Đây (Global State)
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('zippoCart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Lỗi khi tải giỏ hàng từ Local Storage:", error);
      return [];
    }
  });

  const [discountCode, setDiscountCode] = useState('');

  // 🔄 Lưu trạng thái giỏ hàng vào Local Storage
  useEffect(() => {
    localStorage.setItem('zippoCart', JSON.stringify(cart));
  }, [cart]);

  // LOGIC GIỎ HÀNG (Giữ nguyên)
  const addToCart = (product) => { /* ... (Logic cũ) ... */
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, newQuantity) => { /* ... (Logic cũ) ... */
    const quantity = parseInt(newQuantity);
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );
  };

  const removeFromCart = (id) => { /* ... (Logic cũ) ... */
    setCart((prevCart) => prevCart.filter(item => item.id !== id));
  };

  // 💲 Tính toán tổng tiền tự động
  const totals = useMemo(() => {
    let subTotal = 0;
    let totalTax = 0;

    cart.forEach(item => {
      const itemPrice = item.price * item.quantity;
      totalTax += Math.round(itemPrice * item.taxRate);
      subTotal += itemPrice;
    });

    let discount = 0;
    if (discountCode === 'GIAM20') {
      discount = subTotal * 0.2;
    }

    const totalBeforeShipping = subTotal + totalTax - discount;
    const finalTotal = totalBeforeShipping > 0 ? Math.round(totalBeforeShipping + SHIPPING_FEE) : 0;

    return { subTotal, totalTax, shippingFee: SHIPPING_FEE, discount, finalTotal };
  }, [cart, discountCode]);

  const handleApplyDiscount = () => {
    if (discountCode === 'GIAM20') {
      alert("Áp dụng mã giảm giá GIAM20 thành công!");
    } else {
      alert("Mã giảm giá không hợp lệ. Hãy thử: GIAM20");
      setDiscountCode('');
    }
  };


  return (
    <Router>
      <div className="zippo-shop-container">
        <nav className="main-nav">
          <Link to="/" className="logo">🔥 Zippo.VN</Link>
          <Link to="/">Trang chủ</Link>
          <Link to="/products">Sản phẩm</Link>
          <Link to="/cart">Giỏ hàng</Link>

          {localStorage.getItem('currentUser') ? (
            <button
              onClick={() => {
                localStorage.removeItem('currentUser');
                alert('Đã đăng xuất!');
                window.location.reload();
              }}
            >
              Đăng xuất
            </button>
          ) : (
            <>
              <Link to="/login">Đăng nhập</Link>
              <Link to="/register">Đăng ký</Link>
            </>
          )}
        </nav>

        <div className="content-area">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={
              <ProductsPage
                products={initialProducts}
                addToCart={addToCart}
                formatCurrency={formatCurrency}
              />}
            />

            <Route path="/cart" element={
              <CartPage
                cart={cart}
                totals={totals}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
                discountCode={discountCode}
                setDiscountCode={setDiscountCode}
                handleApplyDiscount={handleApplyDiscount}
                formatCurrency={formatCurrency}
              />}
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;