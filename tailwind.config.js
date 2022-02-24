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
    daisyui: {
        themes: [
            'light',
            'dark',
            'cupcake',
            'bumblebee',
            'emerald',
            'corporate',
            'synthwave',
            'retro',
            'cyberpunk',
            'valentine',
            'halloween',
            'garden',
            'forest',
            'aqua',
            'lofi',
            'pastel',
            'fantasy',
            'wireframe',
            'black',
            'luxury',
            'dracula',
            'cmyk',
            'autumn',
            'business',
            'acid',
            'lemonade',
        ],
    },
};
