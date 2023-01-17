export class GetPersonImplementation {
  constructor({ dbGetPerson }) {
    this.dbGetPerson = dbGetPerson
  }

  async handle(call) {
    try {
      const response = await this.dbGetPerson.execute(call.request)

      if (response.error)
        return {
          error: response.error,
        }

      return response
    } catch (error) {
      console.log(error)

      return {
        error:
          'Ocorreu um problema interno, tente novamente ou fale com o suporte',
      }
    }
  }
}
