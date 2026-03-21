// Tailwind CSS v4 is handled natively by Turbopack via `@import "tailwindcss"`
// in globals.css. The @tailwindcss/postcss plugin must NOT be here because
// Turbopack (which requires a plain-object PostCSS config, not a function)
// would pass it through every CSS Module file and inject `*` selectors,
// causing the "Selector '*' is not pure" CSS Modules error.
export default {
  plugins: {},
};
