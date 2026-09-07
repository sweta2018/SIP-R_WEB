import React from 'react';

const MenuPageImage = React.forwardRef(({ item }, ref) => {
  return (
    <div className="menu-page --right" ref={ref}>
      <div className="page-image-content">
        <img src={item.image} alt={item.name} className="menu-image" loading="lazy" />
      </div>
    </div>
  );
});

MenuPageImage.displayName = 'MenuPageImage';

export default MenuPageImage;
