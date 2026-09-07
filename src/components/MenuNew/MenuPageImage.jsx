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
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
              alignSelf: index % 2 === 0 ? 'flex-start' : 'flex-end',
              transform: index % 2 === 0 ? 'rotate(-3deg)' : 'rotate(3deg)'
            }}
          >
            <div 
              className="collage-image-wrapper"
              style={{
                width: '220px',
                height: '160px',
                boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
                borderRadius: '8px',
                border: '4px solid #f4ebd8',
                position: 'relative'
              }}
            >
              <div style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: '4px' }}>
                <img 
                   src={subItem.image} 
                   alt={subItem.name} 
                   style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                   loading="lazy" 
                />
              </div>
            </div>
            
            <div 
              style={{
                backgroundColor: '#f4ebd8',
                padding: '4px 20px',
                borderRadius: '20px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
                fontFamily: "'Alex Brush', cursive",
                color: '#4a3b32',
                fontSize: '28px',
                transform: index % 2 === 0 ? 'rotate(4deg)' : 'rotate(-4deg)'
              }}
            >
              {subItem.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

MenuPageImage.displayName = 'MenuPageImage';

export default MenuPageImage;
