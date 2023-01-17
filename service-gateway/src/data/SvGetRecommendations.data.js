export class SvGetRecommendations {
    constructor({ clientService }) {
        this.clientService = clientService
    }

    async execute({ cpf }) {
        const response = await this.clientService.GetRecommendations({
            cpf,
        })

        if (response.error) {
            return { error: response.error }
        }

        return {
            data: response,
        }
    }
}
