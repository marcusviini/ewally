export class DbCleanDatabase {
  constructor({ personRepository }) {
    this.personRepository = personRepository
  }

  async execute() {
    await this.personRepository.clean()

    return {
      message: 'Database cleaned',
    }
  }
}
