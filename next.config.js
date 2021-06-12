
const withImages = require('next-images');
const withFonts = require('next-fonts');
const path = require('path')

module.exports = withFonts(
  withImages({
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
    },
    future: {
      webpack5: true,
    },
    compress: true,
    distDir: 'build',
    cssLoaderOptions: {
      getLocalIdent: (context, localIdentName, localName, options) => localName
    },
    pageExtensions: ['jsx', 'js'],
    cssModules: true,
    loader: 'url-loader',
  })
);