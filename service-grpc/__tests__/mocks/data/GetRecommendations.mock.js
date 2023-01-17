export class DbGetRecommendationsStub {
  async execute() {
    return Promise.resolve({
      message: 'Recommendations found',
      recommendations: ['12345678904'],
    })
  }
}
