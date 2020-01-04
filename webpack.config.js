const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const webpack = require('webpack')

module.exports = (env, { mode }) => {
	const config = {
		module: {
			rules: [
				{
					test: /\.js$/, 
					exclude: /node_modules/, 
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env', '@babel/preset-react'],
							plugins: ['@babel/plugin-transform-runtime']
						}
					}
				},
				{
					test: /\.css$/,
					use: ['style-loader', 'raw-loader']
				}
			]
		},
		plugins: [ new HtmlWebpackPlugin({ template: './src/index.html' }) ]
	}
	if (mode === 'development') {
		const {
			sheet_url,
			sheet_token,
			sheet_id_register_append,
			sheet_id_register_get,
			sheet_id_refer_append,
			continue_url,
			mapbox_api
		} = require('./credentials')
		config.devtool = 'cheap-module-eval-source-map'
		config.devServer = { historyApiFallback: true }
		config.plugins.push(
			new webpack.DefinePlugin({
				'process.env': {
					SHEET_URL: JSON.stringify(sheet_url),
					SHEET_TOKEN: JSON.stringify(sheet_token),
					SHEET_ID_REGISTER_APPEND: JSON.stringify(sheet_id_register_append),
					SHEET_ID_REGISTER_GET: JSON.stringify(sheet_id_register_get),
					SHEET_ID_REFER_APPEND: JSON.stringify(sheet_id_refer_append),
					CONTINUE_URL: JSON.stringify(continue_url),
					MAPBOX_API: JSON.stringify(mapbox_api)
				}
			})
		)
	}
	if (mode === 'production') {
		config.devtool = 'cheap-module-source-map'
		config.plugins.push(
			new CompressionPlugin(),
			new CopyWebpackPlugin([
				{ from: './_redirects', to: '_redirects', toType: 'file' },
				{ from: './src/sw.js', to: 'sw.js', toType: 'file' }
			]),
			new WebpackPwaManifest({
				name: 'Ziro Afiliados',
				short_name: 'Afiliados',
				start_url: '/',
				background_color: '#FFF',
				theme_color: '#FFF',
				display: 'standalone',
				icons: [{ src: './logo.png', sizes: [96, 128, 192, 256, 384, 512] }]
			}),
			new webpack.DefinePlugin({
				'process.env': {
					SHEET_URL: JSON.stringify(process.env.SHEET_URL),
					SHEET_TOKEN: JSON.stringify(process.env.SHEET_TOKEN),
					SHEET_ID_REGISTER_APPEND: JSON.stringify(process.env.SHEET_ID_REGISTER_APPEND),
					SHEET_ID_REGISTER_GET: JSON.stringify(process.env.SHEET_ID_REGISTER_GET),
					SHEET_ID_REFER_APPEND: JSON.stringify(process.env.SHEET_ID_REFER_APPEND),
					CONTINUE_URL: JSON.stringify(process.env.CONTINUE_URL),
					MAPBOX_API: JSON.stringify(process.env.MAPBOX_API)
				}
			})
		)
	}
	return config
}