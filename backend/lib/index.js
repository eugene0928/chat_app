const http = require('http')
const {server, controllerFunctions, globalValues} = require('./server')

function Express() {
    if(!new.target) {
        return new Express()
    }

    this.server = http.createServer( server )

    this.get = function(route, callback) {
        controllerFunctions['GET'] = controllerFunctions['GET'] || {}
        controllerFunctions['GET'][route] = callback
    }

    this.post = function(route, callback) {
        controllerFunctions['POST'] = controllerFunctions['POST'] || {}
        controllerFunctions['POST'][route] = callback
    }

    this.set = function(key, value) {
        globalValues[key] = value
    }

    this.static = function(path) {
        globalValues['static'] = path
    }

    this.listen = function(PORT, callback) {
        this.server.listen(PORT, callback)
    }

}

module.exports = Express