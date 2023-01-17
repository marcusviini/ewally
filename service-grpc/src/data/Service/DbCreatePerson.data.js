export class DbCreatePerson {
  constructor({ personRepository }) {
    this.personRepository = personRepository
  }

  async execute({ cpf, name }) {
    console.log(cpf, name)
    const findPerson = await this.personRepository.findPerson({ cpf })

    if (findPerson) {
      return {
        error: 'Person already exists',
      }
    }

    await this.personRepository.create({ cpf, name })

    return {
      message: 'Person created',
    }
  }
}
