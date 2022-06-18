/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    container: {
      center: true,
    },
    extend: {},
  },
  plugins: [],
}

// npx tailwindcss -i ./source.css -o ./dist.css --watch