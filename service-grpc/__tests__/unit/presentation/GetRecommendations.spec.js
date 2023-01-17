import { GetRecommendationsImplementation } from '../../../src/presentation/implementation'
import { DbGetRecommendationsStub } from '../../mocks'

let getRecommendationsImplementation
let dbGetRecommendations

const call = {
  request: {
    cpf: '12345678901',
  },
}

describe('GetRecommendationsImplementation', () => {
  beforeEach(() => {
    dbGetRecommendations = new DbGetRecommendationsStub()
    getRecommendationsImplementation = new GetRecommendationsImplementation({
      dbGetRecommendations,
    })
  })

  it('should be defined', () => {
    expect(getRecommendationsImplementation).toBeDefined()
  })

  it('should return 200 dbGetRecommendations on success', async () => {
    const response = await getRecommendationsImplementation.handle(call)

    expect(response).toEqual({
      message: 'Recommendations found',
      recommendations: ['12345678904'],
    })
  })

  it('should return 400 if dbGetRecommendations return an error message', async () => {
    jest.spyOn(dbGetRecommendations, 'execute').mockResolvedValue({
      error: 'Person not found',
    })

    const response = await getRecommendationsImplementation.handle(call)

    expect(response).toEqual({ error: 'Person not found' })
  })

  it('should return 500 if dbGetRecommendations throws', async () => {
    jest.spyOn(dbGetRecommendations, 'execute').mockImplementation(() => {
      'Ocorreu um problema interno, tente novamente ou fale com o suporte'
    })

    const response = await getRecommendationsImplementation.handle(call)

    expect(response).toEqual({
      error:
        'Ocorreu um problema interno, tente novamente ou fale com o suporte',
    })
  })
})
