const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
	entry: './src/index.ts',
	mode: "production",
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	},
	externals: [nodeExternals()],
	target: "node",
	output: {
		libraryTarget: 'umd',
		library: 'KanbanizeAPI',
		filename: 'index.js',
		path: path.resolve(__dirname, '../dist'),
		globalObject: "(typeof self != 'undefined' ? self : this)"
	}
};