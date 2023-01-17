import { Router } from 'express'

import { adapRoute } from '../adapter/express.adapter'

import { SvCreatePerson } from '../../data'

import { CreatePersonController } from '../../presentation/controllers'

import { ClientService } from '../../presentation/service/Client.service'

import { createPersonValidator } from '../../infra/validators'

// import { authMidlleware } from '../../infra/middlewares/auth'

const routes = Router()

const createPersonController = () => {
    const svCreatePerson = new SvCreatePerson({
        clientService: ClientService,
    })

    return new CreatePersonController({ svCreatePerson })
}

routes.post(
    /*
        #swagger.description = 'Rota para cadastrar uma pessoa'
        #swagger.tags = ['Person']
        #swagger.requestBody = {
            required: true,
            description: 'Informações da pessoa',
            content: {
                "application/json": {
                    schema: {
                        type: 'object',
                        properties: {
                            'cpf': {
                                type: 'number',
                                example: '12345678901',
                            },
                            'name': {
                                type: 'string',
                                example: 'john doe',
                            }
                        },
                    }
                },
            },
        },
        #swagger.responses[200] = {
            description: "Mensagem de sucesso",
            schema:{
                message: 'Person created',
            }
        },
        #swagger.responses[400] = {
            description: "Ocorreu um erro",
            schema:{
                error: 'Person already exists',
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
    '/person',

    createPersonValidator,

    adapRoute(createPersonController())
)

export default routes
