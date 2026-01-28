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
                // New explicit colors from the design
                "primary": "#136dec",
                "primary-dark": "#0e4bbf",
                "background-light": "#ffffff",
                "background-dark": "#101822",
                "surface-light": "#f6f7f8",
                "surface-dark": "#1a2432",

                // Existing colors mapped to CSS variables (ensure these are aligned with globals.css updates)
                // Note: 'primary' and 'primary-dark' are now explicitly defined above.
                // The following keep the variable mapping for other colors for theme consistency.
                'primary-hover': 'var(--color-primary-hover)', // This will now use the old primary-hover if needed, or can be removed if not used.
                'primary-light': 'var(--color-primary-light)',
                'secondary': 'var(--color-secondary)',
                'secondary-hover': 'var(--color-secondary-hover)',

                // Generic background/surface if still used alongside light/dark specific ones
                'background': 'var(--color-background)',
                'background-secondary': 'var(--color-background-secondary)',
                'background-tertiary': 'var(--color-background-tertiary)',

                'surface': 'var(--color-surface)',
                'surface-hover': 'var(--color-surface-hover)',

                'text-primary-var': 'var(--color-text-primary)', // Renamed to avoid clash with explicit colors
                'text-secondary-var': 'var(--color-text-secondary)',
                'text-tertiary-var': 'var(--color-text-tertiary)',
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
            fontFamily: {
                "display": ["Inter", "sans-serif"]
            },
            borderRadius: { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" },
        },
    },
    plugins: [],
}