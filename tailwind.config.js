/* eslint-disable global-require */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                Inter: "'Inter', 'sans-serif'",
                Poppins: "'Poppins', 'sans-serif'",
            },
        },
    },
    plugins: [require('daisyui'), require('@tailwindcss/line-clamp')],
};
