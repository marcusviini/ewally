export class CleanDatabaseImplementation {
  constructor({ dbCleanDatabase }) {
    this.dbCleanDatabase = dbCleanDatabase
  }

  async handle(call) {
    try {
      const response = await this.dbCleanDatabase.execute(call.request)

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
