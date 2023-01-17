import http from 'http'
import app from './app'

const server = http.Server(app)

server.listen(process.env.PORT, () => {
    console.info(`PORTA = ${process.env.PORT}`)
    console.info(`(SERVICE GRPC) = ${process.env.GRPC_SERVICE}`)
})

export default server
