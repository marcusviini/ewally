import { Router } from 'express'

import { adapRoute } from '../adapter/express.adapter'

import { SvGetPerson } from '../../data'

import { GetPersonController } from '../../presentation/controllers'

import { ClientService } from '../../presentation/service/Client.service'

import { getPersonValidator } from '../../infra/validators'

// import { authMidlleware } from '../../infra/middlewares/auth'

const routes = Router()

const createPersonController = () => {
    const svGetPerson = new SvGetPerson({
        clientService: ClientService,
    })

    return new GetPersonController({ svGetPerson })
}

routes.get(
    /*
        #swagger.description = 'Rota para buscar uma pessoa'
        #swagger.tags = ['Person']
        #swagger.requestBody = {
            required: true,
            description: 'Cpf da pessoa',
            content: {
                "application/json": {
                    schema: {
                        type: 'object',
                        properties: {
                            'cpf': {
                                type: 'number',
                                example: '12345678901',
                            },
                        },
                    }
                },
            },
        },
        #swagger.responses[200] = {
            description: "Mensagem de sucesso",
            schema:{
                message: 'Person found',
                "person": {
                    "cpf": "12345678901",
                    "name": "john doe"
                },
            }
        },
        #swagger.responses[404] = {
            description: "Ocorreu um erro",
            schema:{
                error: 'Person not found',
            }
        },
        #swagger.responses[500] = {
            description: "Ocorreu um erro interno",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/internal_error"
                    }
                }
            }
        },

    */
    '/person/:cpf',

    getPersonValidator,

    adapRoute(createPersonController())
)

export default routes
