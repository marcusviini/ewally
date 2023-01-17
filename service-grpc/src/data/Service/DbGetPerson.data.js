export class DbGetPerson {
  constructor({ personRepository }) {
    this.personRepository = personRepository
  }

  async execute({ cpf, name }) {
    const findPerson = await this.personRepository.findPerson({ cpf })

    if (!findPerson) {
      return {
        error: 'Person not found',
      }
    }

    return {
      message: 'Person found',
      person: findPerson,
    }
  }
}
