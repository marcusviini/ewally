export class SvCreateRelationship {
    constructor({ clientService }) {
        this.clientService = clientService
    }

    async execute({ cpf1, cpf2 }) {
        const response = await this.clientService.CreateRelationship({
            cpf1,
            cpf2,
        })

        if (response.error) {
            return { error: response.error }
        }

        return {
            data: response,
        }
    }
}
