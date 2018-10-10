const path = require('path');
 
module.exports = {
    entry: './app/assets/scripts/App.js',
    output: {
        filename: 'App.js',
        path: path.resolve(__dirname, './app/temp/scripts')
    },
    module: {
        rules: [
          {
            test: /\.js$/, //regEx to apply only to js files
            exclude: /(node_modules|bower_components)/, // speeds up by not processing these
            use: {
              loader: 'babel-loader', //loads loader
              options: {
                presets: ['@babel/preset-env'] //what standard to use (ecma2015)
              }
            }
          }
        ]
      } 
};