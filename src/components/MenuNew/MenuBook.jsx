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

const MenuCoverRight = forwardRef((props, ref) => (
  <div className="menu-page --right" ref={ref}>
    <div className="page-info-content" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <h1 className="menu-title" style={{ fontSize: '52px', marginBottom: '20px', lineHeight: '1.2' }}>Hot n Cold<br />Coffee</h1>
      <div className="title-separator" style={{ margin: '0 auto 30px' }}></div>
      <p className="menu-desc" style={{ maxWidth: '100%', fontSize: '14px', letterSpacing: '5px', textTransform: 'uppercase', color: '#7b6256' }}>Menu</p>
    </div>
  </div>
));
MenuCoverRight.displayName = 'MenuCoverRight';


const MenuBook = forwardRef(({ items, onPageChange }, ref) => {
  // Update parent with current page to drive navigation dots
  const handleFlip = (e) => {
    // e.data is the current page index (0-based)
    // Pages 0,1 are the Cover spread. Pages 2,3 are item 0.
    const spreadIndex = Math.floor(e.data / 2);
    onPageChange(spreadIndex);
  };

  return (
    <div className="book-wrapper">
      {/* <div className="book-spine"></div> */}
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
        usePortrait={false}
      >
        <MenuCoverLeft />
        <MenuCoverRight />

        {items.flatMap((item, index) => [
          <MenuPageInfo key={`info-${item.id}`} item={item} pageNum={index + 1} totalPages={items.length} />,
          <MenuPageImage key={`img-${item.id}`} item={item} />
        ])}
      </HTMLFlipBook>
    </div>
  );
});

MenuBook.displayName = 'MenuBook';

export default MenuBook;
