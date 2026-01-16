/** @type {import('tailwindcss').Config} */
module.exports = {
  // Update content pattern to match all Taro files
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    // Disable preflight to avoid conflict with WeChat default styles
    preflight: false,
  },
  // IMPORTANT: Replace default separator to avoid special characters like : and / in class names
  // WeChat WXSS doesn't support escaped characters well
  separator: '_', 
}
