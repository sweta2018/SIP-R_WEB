## SIP’R KOLKATA — NEW INTERACTIVE MENU PAGE

I have an existing React website for my café, SIP’R Kolkata.


I want to create a **completely new menu page** based on the design and functionality described below.

### VERY IMPORTANT — DO NOT MODIFY THE EXISTING WEBSITE

Create this as a **new independent page/route called `/menu-new`**.

Do NOT redesign, modify, remove, or break:

* Existing homepage
* Existing About page
* Existing Gallery page
* Existing Contact page
* Existing Menu page
* Existing navbar/header
* Existing footer
* Existing global styles
* Existing colors
* Existing components
* Existing animations
* Existing responsive behavior

The existing website must continue working exactly as it does now.

Only the new `/menu-new` page should contain this new design.

If necessary, create new components and CSS specifically for `/menu-new`, with properly scoped class names so there are no conflicts with the existing website.

---

# DESIGN CONCEPT

The new menu page should look like a **premium physical coffee-table menu book / portfolio book**.

The inspiration is an elegant, vintage, premium café menu.

The page should visually feel like the user has opened a beautiful physical book on a table.

Use:

* Warm cream paper
* Dark brown / almost black leather book cover
* Subtle paper texture
* Realistic page edges
* Central book spine
* Soft page shadows
* Warm café lighting
* Subtle gold/brown accents
* Premium editorial typography
* Minimal and elegant design
* Plenty of whitespace

The overall visual quality should feel **luxury, sophisticated and photographic**, not like a normal website menu.

---

# BOOK FRAME REFERENCE

I will provide an image of the blank open book that represents the desired book frame.

USE THIS IMAGE AS THE VISUAL REFERENCE for:

* Book proportions
* Leather cover
* Page color
* Page edges
* Spine
* Shadows
* Texture
* Overall lighting
* Position and size of the book

IMPORTANT:

Do NOT put the menu content directly into this image.

The menu text and menu photographs must remain real HTML/React content so they are:

* responsive
* accessible
* editable
* searchable
* dynamically generated
* compatible with page-turn animation

If the image is used as a background/reference, keep the actual book pages as React/HTML elements wherever possible.

Do NOT create one flat image containing the entire menu.

---

# PAGE STRUCTURE

Each menu item should occupy a **two-page spread**.

For example, if there are 10 menu items:

10 menu items = 20 physical pages.

### MENU ITEM 1 — LATTE

LEFT PAGE:

* Category: COFFEE
* Menu name: Latte
* Short description
* Ingredients
* Optional price if provided
* Minimal decorative element

RIGHT PAGE:

* Large Latte photograph
* Image should occupy most of the page
* Maintain premium editorial spacing
* Image should have slightly rounded or subtle framed edges if appropriate

The result should look like:

LEFT PAGE                     RIGHT PAGE

┌─────────────────┬─────────────────┐
│                 │                 │
│ COFFEE          │                 │
│                 │                 │
│ Latte           │   LATTE IMAGE   │
│                 │                 │
│ Description     │                 │
│                 │                 │
│ INGREDIENTS     │                 │
│                 │                 │
│ • Espresso      │                 │
│ • Milk          │                 │
│ • Milk Foam     │                 │
│                 │                 │
└─────────────────┴─────────────────┘

Then the user turns the page.

---

# IMPORTANT PAGE LOGIC

The page flip should behave like a real book.

Example:

Spread 1:

* Page 1 = Latte information
* Page 2 = Latte image

Spread 2:

* Page 3 = Cappuccino information
* Page 4 = Cappuccino image

Spread 3:

* Page 5 = Americano information
* Page 6 = Americano image

And so on.

If there are 10 menu items:

Page 1 + 2 = Menu Item 1
Page 3 + 4 = Menu Item 2
Page 5 + 6 = Menu Item 3
...
Page 19 + 20 = Menu Item 10

The UI should consider these as **10 menu spreads**, even though there are 20 physical pages.

Display the counter as:

01 / 10
02 / 10
03 / 10

rather than 01 / 20.

---

# PAGE TURNING

The most important interaction is the realistic page-turn effect.

The user should be able to:

* Click the right arrow to go to the next menu item
* Click the left arrow to go back
* Swipe/drag the page on touch devices
* Use keyboard left/right arrows if practical

The page should visually turn like a physical book.

Use a reliable React page-flip solution/library if appropriate, such as `react-pageflip` / StPageFlip, rather than trying to create an unrealistic page-turn animation from scratch.

However, do not allow the library to dictate the visual design.

The book design must remain custom.

---

# NAVIGATION

Place subtle navigation arrows on either side of the book.

Example:

```
                     ←

          [ OPEN BOOK ]

                     →
```

The arrows should be elegant and minimal.

Do not use large modern website-style buttons.

Use thin circular outlines or another subtle design that matches the premium café aesthetic.

Below the book:

• • • • • • • • • •

01 / 10

The active dot should indicate the current menu item.

---

# MENU DATA

Do not hardcode every menu page individually.

Create a reusable menu data structure such as:

```js
const menuItems = [
  {
    category: "COFFEE",
    name: "Latte",
    description: "...",
    ingredients: [
      "Espresso",
      "Steamed Milk",
      "Milk Foam"
    ],
    image: "/images/menu/latte.webp"
  },
  ...
];
```

The book should dynamically generate the pages from this data.

This means I can later add or remove menu items without changing the book component.

---

# REUSABLE COMPONENT STRUCTURE

Use a clean React structure similar to:

```text
menu-new/
│
├── MenuNew.jsx
├── MenuBook.jsx
├── MenuPage.jsx
├── MenuInfoPage.jsx
├── MenuImagePage.jsx
├── MenuNavigation.jsx
└── menu-new.css
```

The exact structure can be improved if you have a better architecture.

Keep everything related to this new page isolated from the existing website.

---

# TYPOGRAPHY

The typography should feel like a premium editorial coffee menu.

Menu item names such as:

Latte
Cappuccino
Americano

should use an elegant serif/display font.

Supporting text should use a clean, readable sans-serif or restrained serif.

Use clear hierarchy:

CATEGORY

Latte

Description

INGREDIENTS

• Espresso
• Steamed Milk
• Milk Foam

Do not make the typography overly decorative.

The menu should feel sophisticated rather than vintage/ornamental.

---

# COLORS

Base palette should be inspired by the supplied book image:

* Cream / warm ivory paper
* Dark espresso brown
* Deep charcoal
* Warm muted gold
* Soft beige
* Very subtle shadows

Do not introduce bright colors.

The existing SIP’R branding should remain respected.

---

# IMAGES

Each menu item will have its own food/drink photograph.

Use the image as a large editorial photograph on the right-hand page.

Example:

```text
/public/images/menu/latte.webp
/public/images/menu/cappuccino.webp
/public/images/menu/americano.webp
```

Keep image proportions consistent.

Images should feel like professional café photography.

Do not distort images.

Use `object-fit: cover` or an appropriate equivalent.

Optimize images for web performance.

---

# DESKTOP DESIGN

On desktop, the book should be the main visual focus of the page.

The layout should have:

* Existing SIP’R header at the top
* Large open book in the center
* Dark/warm atmospheric background
* Navigation arrows beside the book
* Page indicator underneath

Do not make the book unnecessarily small.

It should occupy most of the available desktop content area while still leaving comfortable margins.

---

# MOBILE DESIGN

Do NOT simply shrink the desktop book until it becomes unreadable.

Create a proper responsive experience.

On mobile:

* The book should fit within the viewport
* Text must remain readable
* Images must remain visually strong
* Navigation arrows must remain accessible
* Touch/swipe page turning should work
* Avoid horizontal page overflow
* Avoid horizontal browser scrolling

If a two-page spread becomes too cramped on mobile, adapt the book interaction intelligently while preserving the concept of:

Information Page → Image Page → Next Menu Item.

---

# ACCESSIBILITY

Keep menu information as real HTML text.

Use:

* semantic headings
* proper alt text for menu images
* keyboard-accessible navigation
* visible focus states where appropriate
* readable contrast

Do not render text inside images.

---

# PERFORMANCE

The page should remain performant.

Use:

* optimized images
* WebP/AVIF where appropriate
* lazy loading for menu images when possible
* avoid unnecessarily huge background assets
* avoid excessive animation
* avoid loading all huge images immediately if not required

The page-turn animation should feel smooth.

---

# IMPORTANT VISUAL RULE

The final page should NOT look like a normal restaurant menu website.

It should look like:

"A beautiful physical coffee portfolio/book opened on a table."

The first impression should be:

**premium + warm + artistic + café + editorial + interactive**

The supplied blank-book image is the visual reference for the physical book.

---

# EXISTING WEBSITE INTEGRATION

Before making changes, inspect the existing React project structure.

Identify:

* routing
* existing header
* existing footer
* existing fonts
* existing color variables
* existing asset structure
* existing CSS architecture

Reuse existing components only where appropriate.

Do not duplicate the existing header unnecessarily.

The new page should use the existing website header/navigation so it feels like part of SIP’R.

Add a new navigation route/page:

`/menu-new`

Do not replace the current `/menu` page.

For now, `/menu` must remain untouched.

---

# DEVELOPMENT APPROACH

First:

1. Inspect the existing project.
2. Create `/menu-new`.
3. Build the static book design.
4. Match the supplied book-frame reference.
5. Create the menu data structure.
6. Add the two-page menu spread.
7. Add realistic page-turn animation.
8. Add navigation.
9. Add responsive mobile behavior.
10. Test that all existing pages still work.

DO NOT make changes to unrelated pages.

Before finishing, verify:

* `/` works
* `/about` works
* `/gallery` works
* `/contact` works
* existing `/menu` works
* `/menu-new` works independently

The final result should be a polished, production-quality interactive SIP’R coffee menu book.


One important recommendation

Yes, give Gemini the blank book-frame image. It will make the result much closer to the mockup we created.

But tell Gemini to treat it primarily as a visual reference, not as the entire menu background. If it uses that single image as the actual book, the page-turn animation will look fake because the book itself won't turn.

The ideal implementation is:

Book frame/look → image reference + CSS/HTML
Pages → actual React elements
Menu content → data
Page turning → React page-flip library
Menu photos → separate optimized images

And I would specifically start with only 2 menu items initially (Latte + Cappuccino). Once the book animation and visual design are perfect, we can plug in the remaining 8 items. That will make debugging much easier.