import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    plugin(({ addUtilities }) => {
      addUtilities({
        '.typography-h1': {
          '@apply scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl':
            {},
        },
        '.typography-h2': {
          '@apply scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0':
            {},
        },
        '.typography-h3': {
          '@apply scroll-m-20 text-2xl font-semibold tracking-tight': {},
        },
        '.typography-h4': {
          '@apply scroll-m-20 text-xl font-semibold tracking-tight': {},
        },
        '.typography-p': {
          '@apply leading-7 [&:not(:first-child)]:mt-6': {},
        },
        '.typography-blockquote': {
          '@apply mt-6 border-l-2 pl-6 italic': {},
        },
        '.typography-list': {
          '@apply my-6 ml-6 list-disc [&>li]:mt-2': {},
        },
        '.typography-inline-code': {
          '@apply relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold':
            {},
        },
        '.typography-lead': {
          '@apply text-xl text-muted-foreground': {},
        },
        '.typography-large': {
          '@apply text-lg font-semibold': {},
        },
        '.typography-small': {
          '@apply text-sm font-medium leading-none': {},
        },
        '.typography-muted': {
          '@apply text-sm text-muted-foreground': {},
        },
        '.typography-detail': {
          '@apply text-xs font-medium leading-5': {},
        },
      });
    }),
  ],
} satisfies Config;

export default config;
