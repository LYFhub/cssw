var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin'); // 将 html 文件打包，并自动添加对打包后的 output 文件的引用
var CleanWebpackPlugin = require('clean-webpack-plugin'); // 每次打包前自动删除存在的dist文件夹
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin'); // 提取css到style.css,不打包进bundle.js
module.exports = {
	entry: './index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: ExtractTextWebpackPlugin.extract({
	            fallback: 'style-loader',
	            use: 'css-loader'
        	})
		}, {
			test: /\.(png|jpg|gif|svg)$/,
			use: [
				'file-loader?name=images/[hash:8].[name].[ext]' // 将图片都打包都images文件夹内
			]
		}, {
			test: /\.(woff|woff2|eot|ttf|otf)$/,
			use: [
				'file-loader'
			]
		}, {
			test: /\.(htm|html)$/i,
			use: [
				'html-withimg-loader'
			]
		}]
	},
	plugins: [
        new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			template: './index.html',
			favicon: path.resolve(__dirname, './favicons/favicon.ico')
		}),
		new ExtractTextWebpackPlugin('style.css')
    ]
}