const tailwindcss = require('tailwind');
module.export = {
  plugins: [tailwindcss('./tailwind.config.js'), require('autoprefixer')],
};
