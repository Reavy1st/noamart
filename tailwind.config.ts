import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#DC2626', // Merah Jawir Style
        secondary: '#EF4444',
        background: '#F8FAFC',
        surface: '#FFFFFF',
        darkBg: '#0F172A',
        darkSurface: '#1E293B',
      },
      borderRadius: { ios: '24px', card: '20px' },
      boxShadow: { soft: '0 10px 40px -10px rgba(0,0,0,0.08)' }
    },
  },
  plugins: [],
}
export default config
