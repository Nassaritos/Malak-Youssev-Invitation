/**
 * Central floral asset manifest.
 * -------------------------------------------------------------
 * Every flower on the site is referenced through this map, so the
 * artwork can be swapped without touching component code.
 *
 * To replace a stem with a real transparent-background PHOTO (PNG):
 *   1. Drop the file into /public/images/flowers/  (e.g. pink-rose-01.png)
 *   2. Change the path below, e.g.  roseBlush: '/images/flowers/pink-rose-01.png'
 * The layout, sizing and animation all keep working unchanged.
 */
export const FLOWERS = {
  roseBlush: '/images/flowers/rose-blush.svg',
  roseWhite: '/images/flowers/rose-white.svg',
  rosebud: '/images/flowers/rosebud.svg',
  eucalyptus: '/images/flowers/eucalyptus.svg',
  lavender: '/images/flowers/lavender.svg',
  babysBreath: '/images/flowers/babys-breath.svg',
  petal: '/images/flowers/petal.svg',
}

// The couple's monogram crest (M · Y), transparent-background cutout.
export const MONOGRAM = '/images/monogram.webp'
