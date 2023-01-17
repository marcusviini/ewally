const swaggerAutogen = require('swagger-autogen')
const path = require('path')
const fs = require('fs')

const getAllFiles = (dirPath, arrayOfFiles) => {
    const files = fs.readdirSync(dirPath)

    arrayOfFiles = arrayOfFiles || []

    console.log(arrayOfFiles)

    files.forEach((file) => {
        if (fs.statSync(`${dirPath}/${file}`).isDirectory()) {
            arrayOfFiles = getAllFiles(`${dirPath}/${file}`, arrayOfFiles)
        } else if (file.includes('.route.js')) {
            const filePath = path
                .join(dirPath, '/', file)
                .replace(__dirname, '.')
            arrayOfFiles.push(filePath)
        }
    })

    return arrayOfFiles
}

const endpointsFiles = getAllFiles(path.join(__dirname, 'routes'))

const doc = {
    info: {
        title: 'SERVICE-GATEWAY',
        version: '1.0.0',
        description: 'Gateway do service.',
    },

    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Desenvolvimento',
        },
    ],

    securityDefinitions: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
        },
    },
    components: {
        schemas: {
            authorization_failed: {
                error: 'Token inválido',
            },
            error: {
                error: 'Ocorreu um erro na consulta',
            },
            internal_error: {
                error: 'Ocorreu um erro interno',
            },
        },
    },
}

const outputFile = './swagger/swagger-output.json'

swaggerAutogen({
    openapi: '3.0.0',
    autoHeaders: false,
    autoQuery: false,
    autoBody: true,
})(outputFile, endpointsFiles, doc)
