/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: ['class', '[data-theme="dark"]'],
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
            },
        },
    },
    plugins: [],
}