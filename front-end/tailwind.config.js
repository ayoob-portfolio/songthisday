module.exports = {
  theme: {
    extend: {
      keyframes: {
        rise: {
          "0%": { transform: "translateY(150%)", opacity: "5%" },
          "100%": {},
        },
        slowrise: {
          "0%": { transform: "translateY(200%)", opacity: "0%" },
          "100%": {},
        },
      },
      animation: {
        rise: "rise 3s ease-in-out",
        slowrise: "slowrise 7s ease-in-out",
      },
    },
  },
  variants: {},
  plugins: [require("tailwindcss-animation-delay")],
};
