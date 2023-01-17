export class PersonRepositoryStub {
  async create() {
    return Promise.resolve()
  }

  async CreateRelationship() {
    return Promise.resolve()
  }

  async findRelationship() {
    return Promise.resolve([
      {
        cpf1: '12345678901',
        cpf2: '12345678902',
      },
      {
        cpf1: '12345678901',
        cpf2: '12345678903',
      },
    ])
  }

  async findPerson() {
    return Promise.resolve([
      {
        cpf: '12345678901',
        name: 'jon doe',
      },
    ])
  }

  async findAllPerson() {
    return Promise.resolve([
      {
        cpf: '12345678901',
        name: 'A',
      },
      {
        cpf: '12345678902',
        name: 'B',
      },
    ])
  }

  async findAllRelationship() {
    return Promise.resolve([
      {
        cpf1: '12345678901',
        cpf2: '12345678902',
      },
      {
        cpf1: '12345678901',
        cpf2: '12345678903',
      },
      {
        cpf1: '12345678902',
        cpf2: '12345678904',
      },
    ])
  }

  async clean() {
    return Promise.resolve()
  }
}
