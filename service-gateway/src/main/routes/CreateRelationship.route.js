import { Router } from 'express'

import { adapRoute } from '../adapter/express.adapter'

import { SvCreateRelationship } from '../../data'

import { CreateRelationshipController } from '../../presentation/controllers'

import { ClientService } from '../../presentation/service/Client.service'

import { createRelationshipValidator } from '../../infra/validators'

// import { authMidlleware } from '../../infra/middlewares/auth'

const routes = Router()

const createRelationshipController = () => {
    const svCreateRelationship = new SvCreateRelationship({
        clientService: ClientService,
    })

    return new CreateRelationshipController({ svCreateRelationship })
}

routes.post(
    /*
        #swagger.description = 'Rota para criar uma relação entre duas pessoas'
        #swagger.tags = ['Relationship']
        #swagger.requestBody = {
            required: true,
            description: 'Cpf dos das duas pessoas',
            content: {
                "application/json": {
                    schema: {
                        type: 'object',
                        properties: {
                            'cp1': {
                                type: 'number',
                                example: '12345678901',
                            },
                            'cpf2': {
                                type: 'number',
                                example: '12345678902',
                            }
                        },
                    }
                },
            },
        },
        #swagger.responses[200] = {
            description: "Mensagem de sucesso",
            schema:{
                message: 'Relationship created',
            }
        },
        #swagger.responses[400] = {
            description: "Ocorreu um erro",
            schema:{
                error: 'Relationship already exists',
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
    '/relationship',

    createRelationshipValidator,

    adapRoute(createRelationshipController())
)

export default routes
