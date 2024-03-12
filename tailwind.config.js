const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { provideTailwindTypography } = require('@aeiforge-workspace/typography');
const { provideTailwindColors, provideTailwindBoxShadow } = require('@aeiforge-workspace/palette');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'apps/**/!(*.stories|*.spec).{ts,html}'),
    join(__dirname, 'packages/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname)
  ],
  theme: {
    fontFamily: {
      'work-sans': ['Work Sans', 'sans-serif']
    },
    fontSize: {
      ...provideTailwindTypography()
    },
    colors: {
      ...provideTailwindColors()
    },
    boxShadow: {
      ...provideTailwindBoxShadow()
    }
  },
  variants: {
    extend: {
      borderColor: [
        'responsive',
        'dark',
        'group-hover',
        'focus-within',
        'hover',
        'focus',
        'active'
      ],
      textColor: [
        'responsive',
        'dark',
        'group-hover',
        'focus-within',
        'hover',
        'focus',
        'active'
      ],
      backgroundColor: [
        'responsive',
        'dark',
        'group-hover',
        'focus-within',
        'hover',
        'focus',
        'active'
      ]
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp')
  ]
};
