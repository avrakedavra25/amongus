/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        among: {
          red: '#C51111',
          darkred: '#7A0838',
          blue: '#132ED1',
          darkblue: '#09158E',
          green: '#117F2D',
          darkgreen: '#0A4D1B',
          pink: '#ED54BA',
          darkpink: '#AB2C81',
          orange: '#EF7D0D',
          darkorange: '#B33E15',
          yellow: '#F5F557',
          darkyellow: '#C28722',
          black: '#3F474E',
          darkblack: '#1E1F26',
          white: '#D6E0F0',
          darkwhite: '#8394BF',
          purple: '#6B2FBC',
          darkpurple: '#3B177C',
          brown: '#71491E',
          darkbrown: '#46290E',
          cyan: '#38FEDC',
          darkcyan: '#24A8BE',
          lime: '#50EF39',
          darklime: '#1D9828',
          table: '#2C5777',
          tableBorder: '#1A364E',
          tableHighlight: '#4A7A9E',
          floor: '#5B6871',
          floorDark: '#444E57',
          consoleBg: '#9BB8A7',
          consoleBorder: '#3C4E43',
          lcdBg: '#091A14',
          lcdText: '#55FFAA'
        }
      },
      fontFamily: {
        among: ['"Amatic SC"', '"Bungee"', '"Space Grotesk"', 'sans-serif'],
        amongTitle: ['"Amatic SC"', 'cursive', 'sans-serif'],
        game: ['"VCR OSD Mono"', '"VT323"', '"Space Grotesk"', 'monospace', 'sans-serif'],
        display: ['"Amatic SC"', '"Bungee"', '"Space Grotesk"', 'cursive', 'sans-serif'],
        pixel: ['"Press Start 2P"', '"VT323"', 'monospace'],
        varela: ['"Varela Round"', 'sans-serif']
      },
      boxShadow: {
        'game-button': '0 6px 0 rgba(0, 0, 0, 0.45)',
        'game-button-active': '0 2px 0 rgba(0, 0, 0, 0.45)',
        'neon-cyan': '0 0 15px rgba(56, 254, 220, 0.75)',
        'neon-red': '0 0 25px rgba(197, 17, 17, 0.85)',
        'neon-yellow': '0 0 15px rgba(245, 245, 87, 0.75)'
      },
      keyframes: {
        bob: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' }
        },
        tumble: {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '100%': { transform: 'translate(100vw, 40vh) rotate(720deg)' }
        },
        emergencyStrobe: {
          '0%, 100%': { backgroundColor: 'rgba(197, 17, 17, 0.35)' },
          '50%': { backgroundColor: 'rgba(197, 17, 17, 0.85)' }
        }
      },
      animation: {
        bob: 'bob 3s ease-in-out infinite',
        tumble: 'tumble 25s linear infinite',
        strobe: 'emergencyStrobe 0.8s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}

