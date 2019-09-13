/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    container: {
      center: true,
    },
    extend: {
      maxWidth: {
        'max-w-7xl': '84rem',
        'max-w-8xl': '96rem'
      },
      minHeight: {
        'list': 'calc(100vh - 61px)'
      },
      height: {
        'list': 'calc(100vh - 61px)'
      },
      margin: {
        '20px': '20px',
        '-20px': '-20px'
      },
      backgroundColor: {
        'primary': '#FCC40F'
      },
      textColor: {
        'primary': '#FCC40F'
      }
    },
  },
  variants: {},
  plugins: []
}
