module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        gradient:
          'linear-gradient(124deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)',
      },
      backgroundImage: {
        starwars: "url('assets/bg.jpg')",
        swDetails: "url('assets/details.jpg')",
      },
      boxShadow: {
        redSh: '2px 2px 4px rgb(200,67,54)',
        hoverSh: '2px 2px 6px 3px rgb(200,67,54)',
      },
    },
  },
  plugins: [],
  important: true,
}
