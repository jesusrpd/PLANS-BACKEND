const app = require('./src/app')
const http = require('http')

const server = http.createServer(app)
const port = 3001

server.listen(port, ()=> {
    console.log(`Server on port ${port}`);
})