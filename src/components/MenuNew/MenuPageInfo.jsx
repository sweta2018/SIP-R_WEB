import React from 'react';

const MenuPageInfo = React.forwardRef(({ item, pageNum, totalPages }, ref) => {
  return (
    <div className="menu-page --left" ref={ref}>
      <div className="page-info-content">
        <div className="page-header">
          <div className="category-line">{item.category}</div>
          <div className="page-num">{(pageNum).toString().padStart(2, '0')} / {totalPages.toString().padStart(2, '0')}</div>
        </div>
        
        <h2 className="menu-title">{item.name}</h2>
        <div className="title-separator"></div>
        
        <p className="menu-desc">{item.description}</p>
        
        <div className="ingredients-title">INGREDIENTS</div>
        <ul className="ingredients-list">
          {item.ingredients.map((ing, i) => (
            <li key={i}>{ing}</li>
          ))}
        </ul>
        
        {/* Simple SVG botanical decor */}
        <svg className="botanical-decor" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 100 C 50 80, 40 60, 20 50 C 40 40, 50 20, 50 0 C 50 20, 60 40, 80 50 C 60 60, 50 80, 50 100 Z" stroke="#7b6256" strokeWidth="2"/>
        </svg>
      </div>
    </div>
  );
});

MenuPageInfo.displayName = 'MenuPageInfo';

export default MenuPageInfo;
