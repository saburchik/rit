module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backgroundImage: {
        starwars: "url('/assets/bg.jpg')",
        shadow:
          "radial-gradient(50% 50% at 50% 50%, #000000 0%, rgba(0, 0, 0, 0) 100%)",
      },
    },
  },
  plugins: [],
};
