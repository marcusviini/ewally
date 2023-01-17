export class DbGetRecommendations {
  constructor({ personRepository }) {
    this.personRepository = personRepository
  }

  async execute({ cpf }) {
    const findPerson = await this.personRepository.findPerson({ cpf })

    if (!findPerson) {
      return {
        error: 'Person not found',
      }
    }

    const findAllRelationship =
      await this.personRepository.findAllRelationship()

    if (findAllRelationship.length === 0) {
      return {
        error: 'No recommendations found',
      }
    }

    const tree = new Map()

    for (const object of findAllRelationship) {
      if (!tree.has(object.cpf1)) tree.set(object.cpf1, [])

      if (!tree.has(object.cpf2)) tree.set(object.cpf2, [])

      tree.get(object.cpf1).push(object.cpf2)

      tree.get(object.cpf2).push(object.cpf1)
    }

    const recommendations = new Map()

    const friends = tree.get(cpf)

    for (const friend of friends) {
      for (const friendOfFriend of tree.get(friend)) {
        if (!friends.includes(friendOfFriend) && friendOfFriend !== cpf) {
          if (!recommendations.has(friendOfFriend)) {
            recommendations.set(friendOfFriend, 1)
          } else {
            recommendations.set(
              friendOfFriend,
              recommendations.get(friendOfFriend) + 1
            )
          }
        }
      }
    }

    const sortedRecommendations = Array.from(recommendations.entries())
      .sort((a, b) => b[1] - a[1])
      .map((item) => item[0])

    if (sortedRecommendations.length === 0) {
      return {
        error: 'Recommendations not found',
      }
    }

    return {
      message: 'Recommendations found',
      recommendations: sortedRecommendations,
    }
  }
}
