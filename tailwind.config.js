module.exports = {
    purge: {
        content: ['./src/**/*.html', './src/**/*.vue'],
        options: {
            whitelist: [
                `border-${process.env.VUE_APP_MEMBER_DEFAULT_COLOR}`,
                `text-${process.env.VUE_APP_MEMBER_DEFAULT_COLOR}`,
                process.env.VUE_APP_MEMBER_COLOR_LIST.split(',').map((color) => `border-${color}`),
                process.env.VUE_APP_MEMBER_COLOR_LIST.split(',').map((color) => `text-${color}`),
                'bg-yellow-300',
            ],
        },
    },
    whitelistPatterns: [],
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
