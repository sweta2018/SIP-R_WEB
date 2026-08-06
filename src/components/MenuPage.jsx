import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { IMAGES } from '../data/images'

gsap.registerPlugin(ScrollTrigger)

// --- Custom SVGs for Menu Icons ---
const IconCoffeeCup = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
    <line x1="6" y1="2" x2="6" y2="4" />
    <line x1="10" y1="2" x2="10" y2="4" />
    <line x1="14" y1="2" x2="14" y2="4" />
  </svg>
)

const IconIced = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8l1.5 12h9L18 8" />
    <path d="M4 8h16" />
    <path d="M12 2v6" />
    <path d="M9 13h2" />
    <path d="M13 17h2" />
  </svg>
)

const IconBrew = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2h12" />
    <path d="M7 2v5l4 5-4 5v5h10v-5l-4-5 4-5V2" />
    <path d="M10 12h4" />
  </svg>
)

const IconPastry = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 4a8 8 0 0 1 8 8c0 4.4-3.6 8-8 8s-8-3.6-8-8a8 8 0 0 1 8-8z" />
    <path d="M4.5 9.5c2.5 1 5 1.5 7.5 1.5s5-.5 7.5-1.5" />
    <path d="M4.5 14.5c2.5-1 5-1.5 7.5-1.5s5 .5 7.5 1.5" />
  </svg>
)

const IconShot = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 10v6a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-6M6 10h12M8 4l-1 6M16 4l1 6" /></svg>
const IconMilk = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 2h8v4L20 8v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8l4-2V2z" /><path d="M8 6h8" /></svg>
const IconPump = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 10v10M8 10h8v12H8zM12 2v4M10 2h6v2h-6zM8 6h8" /></svg>
const IconNut = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="6" /><path d="M12 6a6 6 0 0 1 6 6M6 18l12-12" /></svg>
const IconVanilla = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2c0 10-10 10-10 20M12 2c0 10 10 10 10 20M12 2v20" /></svg>

const IconLeaf = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M11 20A7 7 0 0 1 9 9h2a7 7 0 0 1 2 11ZM15 20a7 7 0 0 0 2-11h-2a7 7 0 0 0-2 11Z" /></svg>
const IconHeart = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
const IconGlobe = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
const IconMug = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 8h12v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8z" /><path d="M16 10h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2" /><path d="M7 2v3M11 2v3M15 2v3" /></svg>

// --- Data ---
const MENU_DATA = {
  signature: [
    { name: 'SIPR Signature Blend', desc: 'Smooth, balanced & unforgettable.', price: '₹220' },
    { name: 'Salted Caramel Latte', desc: 'Buttery caramel with a sea salt touch.', price: '₹240' },
    { name: 'Hazelnut Mocha', desc: 'Rich chocolate with roasted hazelnut.', price: '₹240' },
    { name: 'Spanish Latte', desc: 'Bold espresso with sweetened milk.', price: '₹230' }
  ],
  iced: [
    { name: 'Iced Vanilla Latte', desc: 'Smooth vanilla with chilled milk.', price: '₹230' },
    { name: 'Iced Caramel Macchiato', desc: 'Caramel, milk & a bold espresso shot.', price: '₹240' },
    { name: 'Cold Brew', desc: 'Slow brewed. Smooth. Strong.', price: '₹220' },
    { name: 'Iced Mocha', desc: 'Chocolatey espresso over ice.', price: '₹230' }
  ],
  brew: [
    { name: 'Pour Over', desc: 'Clean, crisp & full of character.', price: '₹210' },
    { name: 'French Press', desc: 'Bold, rich & perfectly brewed.', price: '₹210' },
    { name: 'Aeropress', desc: 'Smooth, clean & intense.', price: '₹210' },
    { name: 'Chemex', desc: 'Delicate, aromatic & pure.', price: '₹230' }
  ],
  bites: [
    { name: 'Almond Croissant', desc: 'Buttery, flaky & almond filled.', price: '₹180' },
    { name: 'Chocolate Croissant', desc: 'Classic pastry with rich chocolate.', price: '₹180' },
    { name: 'Blueberry Cheesecake', desc: 'Creamy, fruity & indulgent.', price: '₹200' },
    { name: 'Triple Chocolate Brownie', desc: 'Rich, fudgy & satisfying.', price: '₹180' }
  ]
}

const ADD_ONS = [
  { name: 'Extra Shot', price: '₹60', icon: IconShot },
  { name: 'Oat Milk', price: '₹60', icon: IconMilk },
  { name: 'Caramel', price: '₹60', icon: IconPump },
  { name: 'Hazelnut', price: '₹60', icon: IconNut },
  { name: 'Vanilla', price: '₹60', icon: IconVanilla }
]

const PROMISES = [
  { name: 'Pure & Natural\nIngredients', icon: IconLeaf },
  { name: 'Brewed\nwith Care', icon: IconHeart },
  { name: 'Ethically\nSourced', icon: IconGlobe },
  { name: 'Made for\nYou', icon: IconMug }
]

export default function MenuPage() {
  const pageRef = useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Fade in menu categories on scroll
      gsap.from('.menu-cat-box', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.menu-grid',
          start: 'top 80%',
        }
      })

      // Fade in addons
      gsap.from('.addon-item', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.addons-section',
          start: 'top 85%',
        }
      })

      // Fade in promises
      gsap.from('.promise-item', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.promise-grid',
          start: 'top 90%',
        }
      })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="menu-editorial-wrapper" ref={pageRef}>

      {/* SECTION 1: Main Split */}
      <section className="menu-hero-split">
        {/* Left Dark Panel */}
        <div className="menu-hero-left">
          {/* <div className="menu-hero-brand">
            <h2 className="sipr-logo-text"><img src='logo-white.png' width={200} /></h2>

          </div> */}

          <div className="menu-hero-title">
            <h2>Every sip<br />tells a<br /><span className="script-text">story.</span></h2>
          </div>


        </div>

        {/* Right Light Panel */}
        <div className="menu-hero-right">
          <div className="menu-header-row">
            <div className="menu-header-titles">
              <span className="explore-eyebrow">EXPLORE OUR</span>
              <h1 className="menu-main-title">MENU</h1>
            </div>
            {/* <div className="stamp-circle">
              <svg viewBox="0 0 100 100" className="stamp-svg">
                <path id="curve" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="transparent" />
                <text className="stamp-text">
                  <textPath href="#curve" startOffset="50%" textAnchor="middle">
                    BREWED WITH PASSION • SERVED WITH LOVE •
                  </textPath>
                </text>
              </svg>
            </div> */}
          </div>

          <div className="menu-grid">
            {/* Signature Coffee */}
            <div className="menu-cat-box">
              <div className="cat-header">
                <div className="cat-icon-circle"><IconCoffeeCup /></div>
                <h4>SIGNATURE COFFEE</h4>
              </div>
              <ul className="cat-items">
                {MENU_DATA.signature.map((item, i) => (
                  <li key={i} className="menu-item-row">
                    <div className="item-top">
                      <span className="item-name">{item.name}</span>
                      <span className="item-leader"></span>
                      <span className="item-price">{item.price}</span>
                    </div>
                    <div className="item-desc">{item.desc}</div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Iced Favorites */}
            <div className="menu-cat-box">
              <div className="cat-header">
                <div className="cat-icon-circle"><IconIced /></div>
                <h4>ICED FAVORITES</h4>
              </div>
              <ul className="cat-items">
                {MENU_DATA.iced.map((item, i) => (
                  <li key={i} className="menu-item-row">
                    <div className="item-top">
                      <span className="item-name">{item.name}</span>
                      <span className="item-leader"></span>
                      <span className="item-price">{item.price}</span>
                    </div>
                    <div className="item-desc">{item.desc}</div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="cat-divider" />
            <div className="cat-divider" />

            {/* Brew Bar */}
            <div className="menu-cat-box">
              <div className="cat-header">
                <div className="cat-icon-circle"><IconBrew /></div>
                <h4>BREW BAR</h4>
              </div>
              <ul className="cat-items">
                {MENU_DATA.brew.map((item, i) => (
                  <li key={i} className="menu-item-row">
                    <div className="item-top">
                      <span className="item-name">{item.name}</span>
                      <span className="item-leader"></span>
                      <span className="item-price">{item.price}</span>
                    </div>
                    <div className="item-desc">{item.desc}</div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bites & Pastries */}
            <div className="menu-cat-box">
              <div className="cat-header">
                <div className="cat-icon-circle"><IconPastry /></div>
                <h4>BITES & PASTRIES</h4>
              </div>
              <ul className="cat-items">
                {MENU_DATA.bites.map((item, i) => (
                  <li key={i} className="menu-item-row">
                    <div className="item-top">
                      <span className="item-name">{item.name}</span>
                      <span className="item-leader"></span>
                      <span className="item-price">{item.price}</span>
                    </div>
                    <div className="item-desc">{item.desc}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Add-ons */}




    </div>
  )
}
