import { Router } from 'express'

import CreatePerson from './CreatePerson.route'
import GetPerson from './GetPerson.route'
import CleanDatabase from './CleanDatabase.route'
import CreateRelationship from './CreateRelationship.route'
import GetRecommendations from './GetRecommendations.route'

const routes = [
    CreatePerson,
    GetPerson,
    CleanDatabase,
    CreateRelationship,
    GetRecommendations,
]

const router = Router()

export const exposeRoutes = routes.map((routerMap) =>
    router.use('/', routerMap)
)
