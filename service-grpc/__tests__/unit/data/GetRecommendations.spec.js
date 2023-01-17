import { DbGetRecommendations } from '../../../src/data'
import { PersonRepositoryStub } from '../../mocks'

let dbGetRecommendations
let personRepository

const request = {
  cpf: '12345678901',
}

describe('DbGetRecommendations', () => {
  beforeEach(() => {
    personRepository = new PersonRepositoryStub()
    dbGetRecommendations = new DbGetRecommendations({ personRepository })
  })

  it('should be defined', () => {
    expect(dbGetRecommendations).toBeDefined()
  })

  it('should be able to call findPerson', async () => {
    const response = jest.spyOn(personRepository, 'findPerson')

    await dbGetRecommendations.execute(request)

    expect(response).toHaveBeenCalledWith(request)
  })

  it('throw an error if person was not found', async () => {
    jest.spyOn(personRepository, 'findPerson').mockResolvedValue(undefined)

    const response = await dbGetRecommendations.execute(request)

    expect(response).toEqual({
      error: 'Person not found',
    })
  })

  it('should be able to call findAllRelationship', async () => {
    const response = jest.spyOn(personRepository, 'findAllRelationship')

    await dbGetRecommendations.execute(request)

    expect(response).toHaveBeenCalledWith()
  })

  it('throw an error if relationship was not found', async () => {
    jest.spyOn(personRepository, 'findAllRelationship').mockResolvedValue([])

    const response = await dbGetRecommendations.execute(request)

    expect(response).toEqual({
      error: 'No recommendations found',
    })
  })

  it('throw an error if recommendations was not found', async () => {
    jest.spyOn(personRepository, 'findAllRelationship').mockResolvedValue([
      {
        cpf1: '12345678901',
      },
    ])

    const response = await dbGetRecommendations.execute(request)

    expect(response).toEqual({
      error: 'Recommendations not found',
    })
  })

  it('should be returns a success message', async () => {
    const response = await dbGetRecommendations.execute(request)

    expect(response).toEqual({
      message: 'Recommendations found',
      recommendations: ['12345678904'],
    })
  })
})
