import path from 'path'

import * as grpc from 'grpc'

import * as protoLoader from '@grpc/proto-loader'

import {
  CreatePersonImplementation,
  GetPersonImplementation,
  CleanDatabaseImplementation,
  CreateRelationshipImplementation,
  GetRecommendationsImplementation,
} from '../presentation/implementation'

import {
  DbCreatePerson,
  DbGetPerson,
  DbCleanDatabase,
  DbCreateRelationship,
  DbGetRecommendations,
} from '../data'

import { PersonRepository } from '../infra/database/repositories/Person.repository'

import { adapter } from './adapter/Grpc.adapter'

import 'dotenv/config'
import { GetPersonImplementation } from '../presentation/implementation/Service/GetPerson.implementation'

const packageClientService = protoLoader.loadSync(
  path.resolve(__dirname, 'pb', 'client.proto'),

  {
    keepCase: true,

    longs: String,

    enums: String,

    defaults: true,

    oneofs: true,
  }
)

const proto = grpc.loadPackageDefinition(packageClientService)

const server = new grpc.Server()

const personRepository = new PersonRepository()

const createPersonImplementation = () => {
  const dbCreatePerson = new DbCreatePerson({
    personRepository,
  })

  return new CreatePersonImplementation({
    dbCreatePerson,
  })
}

const getPersonImplementation = () => {
  const dbGetPerson = new DbGetPerson({
    personRepository,
  })

  return new GetPersonImplementation({
    dbGetPerson,
  })
}

const cleanDatabaseImplementation = () => {
  const dbCleanDatabase = new DbCleanDatabase({
    personRepository,
  })

  return new CleanDatabaseImplementation({
    dbCleanDatabase,
  })
}

const createRelationshipImplementation = () => {
  const dbCreateRelationship = new DbCreateRelationship({
    personRepository,
  })

  return new CreateRelationshipImplementation({
    dbCreateRelationship,
  })
}

const getRecommendationsImplementation = () => {
  const dbGetRecommendations = new DbGetRecommendations({
    personRepository,
  })

  return new GetRecommendationsImplementation({
    dbGetRecommendations,
  })
}

server.addService(proto.ClientService.service, {
  CreatePerson: adapter(createPersonImplementation()),
  GetPerson: adapter(getPersonImplementation()),
  CleanDatabase: adapter(cleanDatabaseImplementation()),
  CreateRelationship: adapter(createRelationshipImplementation()),
  GetRecommendations: adapter(getRecommendationsImplementation()),
})

server.bindAsync(
  `0.0.0.0:${process.env.PORT_GRPC}`,

  grpc.ServerCredentials.createInsecure(),

  (err, port) => {
    if (err != null) {
      return console.error(err)
    }

    console.log(`[SERVICE-GRPC] INICIADO NA PORTA = ${port}`)

    server.start()
  }
)
