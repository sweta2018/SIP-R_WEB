import React, { useState, useRef } from 'react';
import './menu-new.css';
import MenuBook from './MenuBook';
import MenuNavigation from './MenuNavigation';
import { menuGroups } from '../../data/menuData';

const MenuNew = () => {
  const [currentItem, setCurrentItem] = useState(0);
  // We need to access the book to trigger page turns from our custom arrows.
  // HTMLFlipBook doesn't easily expose this through a generic ref without forwardRef in our wrapper.
  // We'll update MenuBook to use forwardRef.
  const bookRef = useRef();

  const handlePrev = () => {
    if (bookRef.current && bookRef.current.pageFlip) {
      bookRef.current.pageFlip().flipPrev();
    }
  };

  const handleNext = () => {
    if (bookRef.current && bookRef.current.pageFlip) {
      bookRef.current.pageFlip().flipNext();
    }
  };

  return (
    <section className="menu-new-container">
      <MenuBook 
        items={menuGroups} 
        onPageChange={setCurrentItem} 
        ref={bookRef}
      />
      
      <MenuNavigation 
        currentItem={currentItem} 
        totalItems={menuGroups.length} 
        onPrev={handlePrev} 
        onNext={handleNext} 
      />
    </section>
  );
};

export default MenuNew;
