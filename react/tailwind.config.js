/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,vue}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  daisyui: {
    styled: true,
    themes: [
      {
        keten: {
          'primary': '#ff8c42',
          'primary-focus': '#e6753a',
          'primary-content': '#ffffff',

          'secondary': '#6b7280',
          'secondary-focus': '#4b5563',
          'secondary-content': '#ffffff',

          'accent': '#e6753a',
          'accent-focus': '#cc6632',
          'accent-content': '#ffffff',

          'neutral': '#e5e7eb',
          'neutral-content': '#1f2937',

          'base-100': '#ffffff',
          'base-200': '#f7f7f7',
          'base-300': '#efefef',
          'base-content': '#1f2937',

          /* important: set focus/focus-ring colors used by DaisyUI */
          'focus': '#e6753a',
          '--focus': '#e6753a'
        }
      }
    ]
  }
}
