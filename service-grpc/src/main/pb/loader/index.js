const path = require('path')
const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const { promisify } = require('util')

module.exports = function load({
  serviceName,
  fileName,
  address,
  credentials = grpc.credentials.createInsecure(),
}) {
  const protoDef = protoLoader.loadSync(
    path.resolve(__dirname, '..', `${fileName}.proto`),
    {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    }
  )

  const proto = grpc.loadPackageDefinition(protoDef)

  const options = { 'grpc.max_receive_message_length': 15 * 1024 * 1024 }

  const client = new proto[serviceName](address, credentials, options)

  Object.entries(client.__proto__).map(([prop, value]) => {
    if (value.originalName !== undefined) {
      client[prop] = promisify(value)
    }
  })

  return client
}
