const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    entry:{
        "env": __dirname + '/environment/environment-web.ts',  
    },
    devtool: 'source-map'
});