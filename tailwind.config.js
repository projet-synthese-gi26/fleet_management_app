/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",

    content: [
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/types/**/*.{js,ts,jsx,tsx,mdx}',
    ],

    theme: {
        extend: {
            colors: {
                'primary': 'var(--color-primary)',
                'primary-hover': 'var(--color-primary-hover)',
                'primary-light': 'var(--color-primary-light)',
                'secondary': 'var(--color-secondary)',
                'secondary-hover': 'var(--color-secondary-hover)',

                'background': 'var(--color-background)',
                'background-secondary': 'var(--color-background-secondary)',
                'background-tertiary': 'var(--color-background-tertiary)',

                'surface': 'var(--color-surface)',
                'surface-hover': 'var(--color-surface-hover)',

                'text-primary': 'var(--color-text-primary)',
                'text-secondary': 'var(--color-text-secondary)',
                'text-tertiary': 'var(--color-text-tertiary)',
                'text-disabled': 'var(--color-text-disabled)',
                'text-invert': 'var(--color-text-invert)',

                'border-default': 'var(--color-border)',
                'border-hover': 'var(--color-border-hover)',

                'success': 'var(--color-success)',
                'success-light': 'var(--color-success-light)',
                'warning': 'var(--color-warning)',
                'warning-light': 'var(--color-warning-light)',
                'error': 'var(--color-error)',
                'error-light': 'var(--color-error-light)',
                'info': 'var(--color-info)',
                'info-light': 'var(--color-info-light)',

                'overlay': 'var(--color-overlay)',
                'overlay-light': 'var(--color-overlay-light)',
            },

            boxShadow: {
                'sm': 'var(--shadow-sm)',
                'md': 'var(--shadow-md)',
                'lg': 'var(--shadow-lg)',
                'xl': 'var(--shadow-xl)',
            },

            spacing: {
                'xs': 'var(--spacing-xs)',
                'sm': 'var(--spacing-sm)',
                'md': 'var(--spacing-md)',
                'lg': 'var(--spacing-lg)',
                'xl': 'var(--spacing-xl)',
                '2xl': 'var(--spacing-2xl)',
                '3xl': 'var(--spacing-3xl)',
            },

            borderRadius: {
                'sm': 'var(--radius-sm)',
                'md': 'var(--radius-md)',
                'lg': 'var(--radius-lg)',
                'xl': 'var(--radius-xl)',
                'full': 'var(--radius-full)',
            },

            transitionDuration: {
                'fast': '150ms',
                'normal': '250ms',
                'slow': '350ms',
            },

            fontFamily: {
                sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
                display: ['Inter', 'sans-serif'],
            },
        },
    },

    plugins: [
        require('@tailwindcss/forms'),
    ],
};