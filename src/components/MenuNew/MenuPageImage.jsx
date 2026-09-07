import React, { forwardRef } from 'react';

const MenuPageImage = forwardRef(({ item }, ref) => {
  return (
    <div className="menu-page --right" ref={ref}>
      <div className="page-image-collage" style={{ 
          height: '100%', 
          padding: '30px', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-evenly', 
          alignItems: 'center' 
      }}>
        {item.items.map((subItem, index) => (
          <div 
            key={index} 
            className="collage-image-wrapper"
            style={{
              width: '220px',
              height: '160px',
              alignSelf: index % 2 === 0 ? 'flex-start' : 'flex-end',
              transform: index % 2 === 0 ? 'rotate(-4deg)' : 'rotate(4deg)',
              boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '4px solid #f4ebd8',
              position: 'relative'
            }}
          >
            <img 
               src={subItem.image} 
               alt={subItem.name} 
               style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
               loading="lazy" 
            />
          </div>
        ))}
      </div>
    </div>
  );
});

MenuPageImage.displayName = 'MenuPageImage';

export default MenuPageImage;
