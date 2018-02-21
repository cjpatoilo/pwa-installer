'use strict'
const fs = require('fs')
const path = require('path')
const glob = require('glob')
const NodeVersionAssets = require('node-version-assets')
const precache = require('sw-precache')
const { info, log } = console

module.exports = (options = {}) => {
	const output = path.dirname(options[0]) || 'dist'
	const swFile = output + '/service-worker.js'
	const htmlFile = path.extname(options[0]) === '.html' ? path.basename(options[0]) : '**/*.html'
	const staticFileGlobs = [output + '/**/*.{html,js,css,png,jpg,jpeg,gif,svg,ico,eot,ttf,woff,woff2,txt,webapp,json}'],
	const stripPrefix = output

	glob(`${output}/**/*.{css,js}`, init)
}

function init (error, assets) {
	if (error) throw error

	glob(`${output}/${htmlFile}`, async (error, grepFiles) => {
		if (error) throw error

		grepFiles.map(htmlFile => {
			fs.readFile(htmlFile, 'utf-8', (error, data) => {
				if (error) throw error

				data = await data.replace('</body>', '<script src="service-worker.js"></script><script>if ("serviceWorker" in navigator && window.location.protocol === "https:") navigator.serviceWorker.register("/service-worker.js")</script></body>')
				await fs.writeFile(htmlFile, data, (error, data) => error ? log(error) : info(`${htmlFile} was saved!`))
			})
		})

		const nva = await new NodeVersionAssets({ assets, grepFiles })

		nva.run()
		precache.write(swFile, { staticFileGlobs,  stripPrefix })
	})
}
