export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Добавьте кастомные цвета и переменные из вашего CSS
      colors: {
        primary: "oklch(var(--primary))",
        destructive: "oklch(var(--destructive))",
        // ... остальные цвета
      },
    },
  },
  plugins: [],
}
