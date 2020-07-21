module.exports = {
    purge: ['./src/**/*.html', './src/**/*.vue'],
    theme: {
        extend: {
            maxHeight: {
                '0': '0',
                '1/4': '25%',
                '1/2': '50%',
                '3/4': '75%',
                '200p': '200px',
            },
            height: {
                '200p': '200px',
            },
            width: {
                '200p': '200px',
            },
            inset: {
                '1/2': '50%',
            },
        },
    },
    variants: {},
    plugins: [],
};
