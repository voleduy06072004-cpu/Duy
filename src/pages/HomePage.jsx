import React, { useState, useEffect } from 'react';

function HomePage() {
  const carouselImages = [
    '/images/rongbac.jpg',
    '/images/hoavan.jpg',
    '/images/quanvu.jpg',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % carouselImages.length
      );
    }, 3000);

    return () => clearInterval(intervalId);
  }, [carouselImages.length]); 
  return (
    <div className="homepage">
      <h1>Chào mừng đến với Zippo.VN</h1>
      <p className="shop-info">
        Chúng tôi là nhà phân phối bật lửa Zippo chính hãng, cam kết chất lượng tuyệt đối và bảo hành trọn đời.
        Khám phá bộ sưu tập Classic, Armor và Limited Edition độc đáo.
      </p>
      
      <div className="carousel-section">
        <h2>🔥 Mẫu Zippo Nổi Bật 🔥</h2>
        
        <div className="zippo-carousel-display">
          <img 
            src={carouselImages[currentImageIndex]} 
            alt="Bộ sưu tập Zippo nổi bật" 
            className="carousel-image"
            key={currentImageIndex} 
          />
        </div>
      </div>
      
      <p className="call-to-action">
        <a href="/products">→ Khám phá toàn bộ Sản Phẩm của chúng tôi</a>
      </p>
    </div>
  );
}

export default HomePage;