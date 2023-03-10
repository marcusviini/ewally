export class CreatePersonImplementation {
  constructor({ dbCreatePerson }) {
    this.dbCreatePerson = dbCreatePerson
  }

  async handle(call) {
    try {
      const response = await this.dbCreatePerson.execute(call.request.person)

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
