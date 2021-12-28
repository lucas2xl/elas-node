module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@types': './src/types',
          '@configs': './src/configs',
          '@interfaces': './src/interfaces',
          '@modules': './src/modules',
          '@shared': './src/shared',
        },
      },
    ],
  ],
};
