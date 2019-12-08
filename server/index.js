const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../web/webpack.js');
const controller = require('./controller');
const network = require('ip').address();

const options = {
  stats: { colors: true },
  host: network,
  open: true
}

const compiler = webpack(webpackConfig);

const server = new webpackDevServer(compiler, options);

const io = require('socket.io')(server.listen(3000));

io.on('connection', (socket) => {
  socket.on('active', (data) => {
    controller(data);
  })
});