import { Router } from 'express'

import { adapRoute } from '../adapter/express.adapter'

import { SvGetRecommendations } from '../../data'

import { GetRecommendationsController } from '../../presentation/controllers'

import { ClientService } from '../../presentation/service/Client.service'

import { getRecommendationsValidator } from '../../infra/validators'

// import { authMidlleware } from '../../infra/middlewares/auth'

const routes = Router()

const getRecommendationsController = () => {
    const svGetRecommendations = new SvGetRecommendations({
        clientService: ClientService,
    })

    return new GetRecommendationsController({ svGetRecommendations })
}

routes.get(
    /*
        #swagger.description = 'Rota para buscar sugestões de amizade'
        #swagger.tags = ['Recommendations']
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
                message: 'Recommendations found',
                "recommendations": [
                    "12345678904",
                    "12345678905"
                ],
            }
        },
        #swagger.responses[400] = {
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
    '/recommendations/:cpf',

    getRecommendationsValidator,

    adapRoute(getRecommendationsController())
)

export default routes
