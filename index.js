'use strict'
const fs = require('fs')
const path = require('path')
const glob = require('glob')
const swPrecache = require('sw-precache')

function getOutputs(output) {
	return new Promise((resolve, reject) => {
		fs.stat(output, async (error, stats) => {
			if (!fs.existsSync(output) || error) {
				console.log('[error] Not found')
				process.exit(2)
			}

			const assets = stats.isDirectory() ? await getFiles(output + '/**/*.{css,js}') : await getFiles(path.dirname(output) + '/**/*.{css,js}')
			const base = stats.isDirectory() ? output : path.dirname(output)
			const htmls = stats.isDirectory() ? await getFiles(output + '/**/*.html') : [output]

			resolve({ assets, base, htmls })
		})
	})
}

function getFiles (path) {
	return new Promise((resolve, reject) => {
		glob(path, (err, data) => resolve(data))
	})
}

function hashFile (hash, file) {
	return `${path.dirname(file)}/${path.basename(file, path.extname(file))}-${hash + path.extname(file)}`
}

module.exports = async (options) => {
	const { assets, base, htmls } = await getOutputs(options[0])
	const hash = +new Date()

	Promise.all([

		htmls.map(html => fs.readFile(html, 'utf-8', (error, data) => {
			if (error) throw error

			const htmlBefore = '</body>'
			const htmlAfter = '<script src="service-worker.js"></script><script>if("serviceWorker" in navigator && window.location.protocol === "https:")navigator.serviceWorker.register("/service-worker.js")</script></body>'

			fs.writeFile(html, data.replace(htmlBefore, htmlAfter), (error, data) => {
				if (error) throw error
				console.info(`${html} was saved!`)
			})
		})),

		assets.map(asset => fs.readFile(asset, 'utf-8', (error, data) => {
			if (error) throw error

			htmls.map(html => fs.readFile(html, 'utf-8', (error, data) => {
				if (error) throw error

				const assetBefore = path.basename(asset)
				const assetAfter = `${path.basename(asset, path.extname(asset))}-${hash + path.extname(asset)}`

				fs.writeFile(html, data.replace(assetBefore, assetAfter), (error, data) => {
					if (error) throw error
				})
			}))

			fs.writeFile(hashFile(hash, asset), data, (error, data) => {
				if (error) throw error

				fs.unlink(asset, (error, data) => {
					if (error) throw error
					console.info(`${hashFile(hash, asset)} was saved!`)
				})
			})
		})),

		swPrecache.write(`${base}/service-worker.js`, {
			staticFileGlobs: [base + '/**/*.{html,js,css,png,jpg,jpeg,gif,svg,ico,eot,ttf,woff,woff2,txt,webapp,json}'],
			stripPrefix: base
		})

	])
}
