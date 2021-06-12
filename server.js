const dev = process.env.NODE_ENV !== 'production'
const serverPort = 3000
require('./app')(dev, serverPort)
