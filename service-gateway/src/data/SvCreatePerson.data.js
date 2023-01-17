export class SvCreatePerson {
    constructor({ clientService }) {
        this.clientService = clientService
    }

    async execute({ cpf, name }) {
        const response = await this.clientService.createPerson({
            person: {
                cpf,
                name,
            },
        })

        if (response.error) {
            return { error: response.error }
        }

        return {
            data: response,
        }
    }
}
