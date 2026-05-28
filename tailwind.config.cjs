module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F59A57',
        bg: '#F5F3F1',
        surface: '#FFFFFF',
        text: '#2A2A2A',
        muted: '#7A7A7A',
        teal: '#00bfa6'
      },
      borderRadius: {
        xl: '16px'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}
