export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: ({ colors }) => ({
        primary: '#1D2959',
        error: '#EE0000'
      })
    }
  },
  plugins: []
};
