import React, { forwardRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import MenuPageInfo from './MenuPageInfo';
import MenuPageImage from './MenuPageImage';

const MenuCoverLeft = forwardRef((props, ref) => (
  <div className="menu-page --left" ref={ref}>
    <div className="page-info-content" style={{ justifyContent: 'center', alignItems: 'center' }}>
      <img src="/sipr-logo.png" alt="SIP'R Logo" style={{ width: '200px' }} />
    </div>
  </div>
));
MenuCoverLeft.displayName = 'MenuCoverLeft';

const MenuCoverRight = forwardRef(({ title, subtitle }, ref) => (
  <div className="menu-page --right" ref={ref}>
    <div className="page-info-content" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <h1 className="menu-title" style={{ fontSize: '52px', marginBottom: '20px', lineHeight: '1.2' }} dangerouslySetInnerHTML={{ __html: title || "Menu" }}></h1>
      <div className="title-separator" style={{ margin: '0 auto 30px' }}></div>
      <p className="menu-desc" style={{ maxWidth: '100%', fontSize: '14px', letterSpacing: '5px', textTransform: 'uppercase', color: '#7b6256' }}>{subtitle}</p>
    </div>
  </div>
));
MenuCoverRight.displayName = 'MenuCoverRight';

const MenuBook = forwardRef(({ items, onPageChange }, ref) => {
  const handleFlip = (e) => {
    const spreadIndex = Math.floor(e.data / 2);
    onPageChange(spreadIndex);
  };

  return (
    <div className="book-wrapper">
      <HTMLFlipBook
        width={450}
        height={600}
        size="stretch"
        minWidth={315}
        maxWidth={500}
        minHeight={400}
        maxHeight={700}
        maxShadowOpacity={0.3}
        showCover={false}
        mobileScrollSupport={true}
        flippingTime={800}
        swipeDistance={30}
        className="menu-flip-book"
        ref={ref}
        onFlip={handleFlip}
        usePortrait={true}
      >
        {items.flatMap((item, index) => {
          if (item.type === 'cover') {
            return [
              <MenuCoverLeft key={`cover-l-${item.id}`} />,
              <MenuCoverRight key={`cover-r-${item.id}`} title={item.title} subtitle={item.subtitle} />
            ];
          }
          return [
            <MenuPageInfo key={`info-${item.id}`} item={item} pageNum={index + 1} totalPages={items.length} />,
            <MenuPageImage key={`img-${item.id}`} item={item} />
          ];
        })}
      </HTMLFlipBook>
    </div>
  );
});

MenuBook.displayName = 'MenuBook';

export default MenuBook;
