const person = [
  // {
  //   cpf: '12345678901',
  //   name: 'A',
  // },
  // {
  //   cpf: '12345678902',
  //   name: 'B',
  // },
  // {
  //   cpf: '12345678903',
  //   name: 'C',
  // },
  // {
  //   cpf: '12345678904',
  //   name: 'D',
  // },
  // {
  //   cpf: '12345678905',
  //   name: 'E',
  // },
]

const relationship = [
  // {
  //   cpf1: '12345678901',
  //   cpf2: '12345678902',
  // },
  // {
  //   cpf1: '12345678901',
  //   cpf2: '12345678903',
  // },
  // {
  //   cpf1: '12345678902',
  //   cpf2: '12345678904',
  // },
  // {
  //   cpf1: '12345678903',
  //   cpf2: '12345678904',
  // },
  // {
  //   cpf1: '12345678903',
  //   cpf2: '12345678905',
  // },
]

export class PersonRepository {
  async create({ cpf, name }) {
    return person.push({ cpf, name })
  }

  async CreateRelationship({ cpf1, cpf2 }) {
    return relationship.push({ cpf1, cpf2 })
  }

  async findRelationship({ cpf1, cpf2 }) {
    return relationship.find(
      (person) => person.cpf1 === cpf1 && person.cpf2 === cpf2
    )
  }

  async findPerson({ cpf }) {
    return person.find((person) => person.cpf === cpf)
  }

  async findAllPerson() {
    return person
  }

  async findAllRelationship() {
    return relationship
  }

  async clean() {
    person.splice(0, person.length)
    relationship.splice(0, relationship.length)
    return true
  }
}
