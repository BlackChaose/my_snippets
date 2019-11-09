
module.exports = {
  presets: [
    ['@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  env: {
    development: {
      plugins: ['@babel/plugin-transform-modules-commonjs'],
    },
  },
};
