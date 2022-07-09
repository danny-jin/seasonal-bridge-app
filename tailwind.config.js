/** @type {import('tailwindcss').Config} */
function range(start, end, increment = 1) {
  const count = Math.floor((end - start + 1) / increment);
  return Array(count).fill(0).map((_, idx) => start + idx * increment);
}

const minFontSize = 5;
const maxFontSize = 140;

const minSpacingPixel = 0;
const maxSpacingPixel = 1000;
const spacingPixelIncrement = 5;

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontSize: {
        ...range(minFontSize, maxFontSize).reduce((merged, f) => ({ ...merged, [f]: `${f}px`}), {}),
      },
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      letterSpacing: {
        '4': '4px',
        ...range(1, 100).reduce((merged, f) => ({ ...merged, [`${f}p`]: `${f*0.01}em`}), {}),
      },
    },
  },
  plugins: [],
}
