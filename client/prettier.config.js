// prettier.config.js
module.exports = {
    // eslint-disable-next-line import/no-extraneous-dependencies, global-require
    plugins: [require('prettier-plugin-tailwindcss')],
    tailwindConfig: './tailwind.config.js',
    tabWidth: 4,
};
