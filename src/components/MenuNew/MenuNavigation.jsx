import React from 'react';

const MenuNavigation = ({ currentItem, totalItems, onPrev, onNext }) => {
  return (
    <>
      <div className="menu-navigation-wrapper">
        <button className="nav-arrow" onClick={onPrev} aria-label="Previous page">
          <svg viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>
        <button className="nav-arrow" onClick={onNext} aria-label="Next page">
          <svg viewBox="0 0 24 24">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
          </svg>
        </button>
      </div>
      
      <div className="menu-pagination">
        <div className="page-dots">
          {Array.from({ length: totalItems }).map((_, index) => (
            <div 
              key={index} 
              className={`dot ${index === currentItem ? 'active' : ''}`}
            />
          ))}
        </div>
        <div className="page-fraction">
          {(currentItem + 1).toString().padStart(2, '0')} / {totalItems.toString().padStart(2, '0')}
        </div>
      </div>
    </>
  );
};

export default MenuNavigation;
