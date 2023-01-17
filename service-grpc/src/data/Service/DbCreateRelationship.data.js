export class DbCreateRelationship {
  constructor({ personRepository }) {
    this.personRepository = personRepository
  }

  async execute({ cpf1, cpf2 }) {
    const findPersons = await this.personRepository.findAllPerson()

    if (!findPersons) {
      return {
        error: 'No persons found',
      }
    }

    const findPerson1 = findPersons.find((person) => person.cpf === cpf1)

    const findPerson2 = findPersons.find((person) => person.cpf === cpf2)

    if (!findPerson1 || !findPerson2) {
      return {
        error: 'Person cpf1 or cpf2 not found',
      }
    }

    const findRelationship = await this.personRepository.findRelationship({
      cpf1,
      cpf2,
    })

    if (findRelationship) {
      return {
        error: 'Relationship already exists',
      }
    }

    await this.personRepository.CreateRelationship({ cpf1, cpf2 })

    return {
      message: 'Relationship created',
    }
  }
}
