import React, { useState, useRef, useMemo, useEffect } from 'react';
import './menu-new.css';
import MenuBook from './MenuBook';
import MenuNavigation from './MenuNavigation';
import { menuGroups } from '../../data/menuData';

const MenuNew = () => {
  const [currentItem, setCurrentItem] = useState(0);
  const bookRef = useRef();
  
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const processedGroups = useMemo(() => {
    if (!isMobile) return menuGroups;
    
    const result = [];
    let currentCategory = null;
    let currentItems = [];

    menuGroups.forEach(group => {
      if (group.type === 'cover') {
        if (currentItems.length > 0) {
          result.push({ id: `mob-${result.length}`, type: 'items', category: currentCategory, items: currentItems });
          currentItems = [];
        }
        result.push(group);
      } else if (group.type === 'items') {
        const isMocktailOrSignature = (cat) => cat === 'MOCKTAILS' || cat === 'SIGNATURE DRINKS';
        const shouldSplit = currentCategory !== group.category && 
                            !(isMocktailOrSignature(currentCategory) && isMocktailOrSignature(group.category));
                            
        if (shouldSplit && currentItems.length > 0) {
          result.push({ id: `mob-${result.length}`, type: 'items', category: currentCategory, items: currentItems });
          currentItems = [];
        }
        currentCategory = group.category;
        
        group.items.forEach(item => {
          currentItems.push(item);
          if (currentItems.length === 4) {
            result.push({ id: `mob-${result.length}`, type: 'items', category: currentCategory, items: currentItems });
            currentItems = [];
          }
        });
      }
    });

    if (currentItems.length > 0) {
      result.push({ id: `mob-${result.length}`, type: 'items', category: currentCategory, items: currentItems });
    }
    return result;
  }, [isMobile]);

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
        items={processedGroups} 
        onPageChange={setCurrentItem} 
        ref={bookRef}
      />
      
      <MenuNavigation 
        currentItem={currentItem} 
        totalItems={processedGroups.length} 
        onPrev={handlePrev} 
        onNext={handleNext} 
      />
    </section>
  );
};

export default MenuNew;
