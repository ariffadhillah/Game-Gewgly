var path = require('path');
var pathToPhaser = path.join(__dirname, '/node_modules/phaser/');
var phaser = path.join(pathToPhaser, 'dist/phaser.js');

module.exports = (env) => {

  // console.log("env $$$$$$$", env);
  // console.log("env.GAME_ID $$$$$$$", env.GAME_ID);
  // console.log("process.env $$$$$$$", process.env);
  // console.log("GAME_ID", GAME_ID)
  console.log(process.env.GAME_ID);

  console.log("PLACEHOLDER");

  return {
    entry: './src/games/gewgly/game.ts', // './src/boilerplate/game.ts', // env.production ? './src/boilerplate/game.ts' : './src/boilerplate/game.ts', // './src/games/asteroid/game.ts',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        { test: /\.ts$/, loader: 'ts-loader', exclude: '/node_modules/' },
        { test: /phaser\.js$/, loader: 'expose-loader?Phaser' }
      ]
    },
    devServer: {
      contentBase: path.resolve(__dirname, './'),
      publicPath: '/dist/',
      host: '127.0.0.1',
      port: 8080,
      open: true
    },
    resolve: {
      extensions: ['.ts', '.js'],
      alias: {
        phaser: phaser
      }
    }
  }
};
