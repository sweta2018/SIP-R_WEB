// Curated premium coffee & bakery photography.
// All images are sourced from Unsplash and are free to use for commercial
// projects under the Unsplash License (https://unsplash.com/license) —
// no attribution required.
//
// Helper builds a right-sized, compressed CDN url so every image is
// lazy-loaded at a sensible resolution instead of shipping full 3000px originals.
const u = (id, w = 1600, q = 75) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=${q}`

export const IMAGES = {
  // Hero layered visual
  heroCup: u('photo-1527156231393-7023794f363c', 1400, 80), // iced coffee highball glass
  heroSplash: u('photo-1678019940462-490ab4f9579a', 1200, 80), // coffee splash
  heroBeansDark: u('photo-1753837787691-84a06d715d24', 1200, 80), // beans on black bg
  heroSteam: u('photo-1635191535841-a6d4d88e1612', 1200, 80), // steaming cup / steam wisps

  // About
  aboutInterior: u('photo-1752756992329-961db6366376', 1600, 78), // cozy coffee lounge interior
  aboutBeans: u('photo-1603719461446-3c44df22d274', 1200, 75), // beans on table

  // Signature coffee
  sigBarista: u('photo-1761271046396-97d231b59dd7', 1400, 78), // barista pouring latte art
  sigHeartLatte: u('photo-1512568400610-62da28bc8a13', 1400, 78), // heart latte on beans
  sigFlatlay: u('photo-1511920170033-f8396924c348', 1400, 78), // flatlay latte + beans
  sigCupBeans: u('photo-1564676677001-92e8f1a0df30', 1200, 75), // cup with beans close-up

  // Bakery
  bakeryPastryDisplay: u('photo-1454641350786-bc31a1997ba9', 1400, 78), // trays of baked goods
  bakeryBreadShelf: u('photo-1568254183919-78a4f43a2877', 1400, 78), // bread display shelf

  // Menu thumbnails (reused, cropped small)
  menuEspresso: u('photo-1564676677001-92e8f1a0df30', 800, 70),
  menuLatte: u('photo-1512568400610-62da28bc8a13', 800, 70),
  menuIced: u('photo-1527156231393-7023794f363c', 800, 70),
  menuPastry: u('photo-1454641350786-bc31a1997ba9', 800, 70),
  menuBread: u('photo-1568254183919-78a4f43a2877', 800, 70),
  menuBeans: u('photo-1753837787691-84a06d715d24', 800, 70),

  // Gallery
  galleryA: u('photo-1752756992329-961db6366376', 1000, 72),
  galleryB: u('photo-1761271046396-97d231b59dd7', 1000, 72),
  galleryC: u('photo-1454641350786-bc31a1997ba9', 1000, 72),
  galleryD: u('photo-1568254183919-78a4f43a2877', 1000, 72),
  galleryE: u('photo-1512568400610-62da28bc8a13', 1000, 72),
  galleryF: u('photo-1603719461446-3c44df22d274', 1000, 72),

  // Contact / footer backdrop
  footerBeans: u('photo-1753837787691-84a06d715d24', 1600, 72),
}
