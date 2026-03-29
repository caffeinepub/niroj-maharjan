/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: 'oklch(var(--border) / <alpha-value>)',
        input: 'oklch(var(--input) / <alpha-value>)',
        ring: 'oklch(var(--ring) / <alpha-value>)',
        background: 'oklch(var(--background) / <alpha-value>)',
        foreground: 'oklch(var(--foreground) / <alpha-value>)',
        primary: {
          DEFAULT: 'oklch(var(--primary) / <alpha-value>)',
          foreground: 'oklch(var(--primary-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'oklch(var(--secondary) / <alpha-value>)',
          foreground: 'oklch(var(--secondary-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'oklch(var(--muted) / <alpha-value>)',
          foreground: 'oklch(var(--muted-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
          foreground: 'oklch(var(--accent-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'oklch(var(--destructive) / <alpha-value>)',
          foreground: 'oklch(var(--destructive-foreground) / <alpha-value>)',
        },
        card: {
          DEFAULT: 'oklch(var(--card) / <alpha-value>)',
          foreground: 'oklch(var(--card-foreground) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'oklch(var(--popover) / <alpha-value>)',
          foreground: 'oklch(var(--popover-foreground) / <alpha-value>)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        'card-dark': '0 1px 3px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.3)',
        'card-lift': '0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.12)',
        'card-cream': '0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.08)',
        'card-cream-lift': '0 8px 32px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
