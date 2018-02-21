'use strict'
const { existsSync, readFile, writeFile } = require('fs')
const glob = require('glob')
const NodeVersionAssets = require('node-version-assets')
const { write } = require('sw-precache')
const { info, log } = console

module.exports = (options = {}) => {
	const output = options._[0]
	const swFile = output + '/service-worker.js'
	const replace = [
		'</body>',
		'<script src="service-worker.js"></script><script>if("serviceWorker" in navigator && window.location.protocol === "https:")navigator.serviceWorker.register("/service-worker.js")</script></body>'
	]

	if (!existsSync(output)) {
		log('[error] Directory not found')
		process.exit(2)
	}

	glob(output + '/**/*.{css,js}', (error, assets = []) => {
		if (error) throw error

		glob(output + '/**/*.html', async (error, grepFiles = []) => {
			if (error) throw error

			await grepFiles.map(file => readFile(file, 'utf-8', (error, data) => {
				if (error) throw error

				writeFile(file, data.replace(replace), (error, data) => {
					if (error) throw error
					info(`${data} was saved!`)
				})
			}))

			const nva = await new NodeVersionAssets({ assets, grepFiles })
			nva.run()

			write(swFile, { staticFileGlobs: [output + '/**/*.{html,js,css,png,jpg,jpeg,gif,svg,ico,eot,ttf,woff,woff2,txt,webapp,json}'], stripPrefix: output })
		})
	})
}
