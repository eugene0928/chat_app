const urlModule = require('url')
const queryString = require('querystring')
const path = require('path')
const fs = require('fs')
let controllerFunctions = {}
let globalValues = {}


let server = ( req, res ) => {
    console.log(req.url)

    const {pathname, query} = urlModule.parse(req.url.toLowerCase())
    const method = req.method.toUpperCase()

    req.query = queryString.parse(query)

    if(method != 'GET') {
        req.body = new Promise( (res, rej ) => {
            let info = ''
            req.on('data', (chunk) => info += chunk)
            req.on('end', () => {
                try{
                    const value = JSON.parse(info)
                    return res(value)
                }catch (err){
                    return rej(err)
                }
            })

        })
    } 

    res.json = function(value) {
        res.setHeader('Content-Type', 'application/json')
        return res.end(JSON.stringify(value))
    }

    res.render = function(htmlFile) {
        console.log(globalValues['views'])
        // res.setHeader('Content-Type', 'text/html')
        const file = fs.readFileSync(path.join(globalValues['views'], htmlFile + '.html'))
        return res.end(file)
    }

    if(controllerFunctions[method]?.[pathname]) {
        return controllerFunctions[method][pathname](req, res)
    } else {
        const extname = path.extname(pathname)

        if(pathname == '/favicon.ico') {
            res.end()
            return
        }

        let pathExists = fs.existsSync(path.join(globalValues['static'], pathname))

        if(!extname || !pathExists) return res.end()

        const contentTypes = {
			'.html': 'text/html',
			'.txt': 'text/plain',
			'.css': 'text/css',
			'.js': 'application/js',
			'.json': 'application/json',
			'.zip': 'application/zip',
			'.pdf': 'application/pdf',
			'.xml': 'application/xml',
			'.mp3': 'audio/mp3',
			'.jpg': 'image/jpg',
			'.jpeg': 'image/jpeg',
			'.png': 'image/png',
			'.svg': 'image/svg+xml',
			'.mp4': 'video/mp4',
		}

        const contentType = contentTypes[extname] || 'application/octet-stream'

        res.writeHead(200, { 'Content-Type': contentType })
		res.end(
			fs.readFileSync( path.join(globalValues['static'], pathname) )
		)
    }
}

module.exports = {
    server, controllerFunctions, globalValues
}
