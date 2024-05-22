export default {
  plugins: {
    'postcss-import': {},
    
    tailwindcss: {},
    
    // autoprefixer: {},
    autoprefixer: {},

    'postcss-replace': {
      pattern: /(--tw|\*, ::before, ::after)/g,
      data: {
        '--tw': '--t', // Prefixing
        '*, ::before, ::after': ':root', // So variables does not pollute every element
      }
    },

    'postcss-preset-mantine': {},
    
    'postcss-simple-vars': {
      variables: {
        'mantine-breakpoint-xs': '36em',
        'mantine-breakpoint-sm': '48em',
        'mantine-breakpoint-md': '62em',
        'mantine-breakpoint-lg': '75em',
        'mantine-breakpoint-xl': '88em',
      },
    },
  },
}
