import { Router } from 'express'

import { adapRoute } from '../adapter/express.adapter'

import { SvCleanDatabase } from '../../data'

import { CleanDatabaseController } from '../../presentation/controllers'

import { ClientService } from '../../presentation/service/Client.service'

// import { authMidlleware } from '../../infra/middlewares/auth'

const routes = Router()

const cleanDatabaseController = () => {
    const svCleanDatabase = new SvCleanDatabase({
        clientService: ClientService,
    })

    return new CleanDatabaseController({ svCleanDatabase })
}

routes.delete(
    /*
        #swagger.description = 'Rota para limpar o banco de dados em memoria'
        #swagger.tags = ['Clean']
        #swagger.responses[200] = {
            description: "Mensagem de sucesso",
            schema:{
                message: 'Database cleaned',
            }
        },
        #swagger.responses[400] = {
            description: "Ocorreu um erro",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/error"
                    }
                }
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
    '/clean',

    adapRoute(cleanDatabaseController())
)

export default routes
