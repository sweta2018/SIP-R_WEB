import React, { forwardRef } from 'react';

const MenuPageInfo = forwardRef(({ item, pageNum, totalPages }, ref) => {
  return (
    <div className="menu-page --left" ref={ref}>
      <div className="page-info-content">
        <div className="page-header">
          <span className="category-line">{item.category}</span>
          <span className="page-number">{(pageNum).toString().padStart(2, '0')}</span>
        </div>
        
        <div className="menu-items-list" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {item.items.map((subItem, index) => (
            <div key={index} className="menu-item-group">
              <h2 className="menu-title" style={{ fontSize: '32px', marginBottom: '8px' }}>{subItem.name}</h2>
              <div className="title-separator" style={{ marginBottom: '10px' }}></div>
              <div className="ingredients-section">
                <h3 className="ingredients-title" style={{ fontSize: '13px', marginBottom: '10px' }}>Ingredients</h3>
                <ul className="ingredients-list">
                  {subItem.ingredients.map((ingredient, idx) => (
                    <li key={idx}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {item.category === 'SIGNATURE DRINKS' && (
          <div className="signature-love" style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', color: '#d92c2c', opacity: 1 }}>
            <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
        )}

        <img src="/p.png" alt="Decor" className="botanical-decor" />
      </div>
    </div>
  );
});

MenuPageInfo.displayName = 'MenuPageInfo';

export default MenuPageInfo;
